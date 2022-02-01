<script>
  import { onMount } from "svelte";

  import { token } from "./stores";

  import Puffles from "./Puffles.svelte";
  import RetryButton from "./RetryButton.svelte";

  let state = { drawing: true };
  let painterTarget;
  let jtwValue;
  token.subscribe((value) => (jtwValue = value));

  let captions = [];
  let tags = [];

  onMount(() => {
    // https://github.com/sveltejs/svelte/issues/6584#issuecomment-1019578529
    import("painter/Painter").then(
      (painter) => {
        const Painter = painter.default;
        new Painter({ target: painterTarget });
      },
      (reject) => {
        console.error(reject, "Could not load painter");
      }
    );
  });

  function handleRetryClick() {
    state.drawing = true;
    captions = [];
    tags = [];
  }

  function handleOnSendClick() {
    const canvas = document.querySelector("canvas");
    canvas.toBlob(sendRequest);
    state.drawing = false;
  }

  async function sendRequest(blob) {
    const data = new FormData();
    data.append("image", blob);

    const request = new Request("http://localhost/api/caption", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jtwValue}`,
        Accept: "application/json",
        "Content-Disposition": "multipart/form-data",
      },
      body: data,
    });

    const response = await fetch(request);
    if (response.status === 401) {
      console.log("Access Token expired, requesting new");
      const newToken = await refreshToken();
      token.set(newToken.access);
      handleOnSendClick();
      return;
    } else if (response.status === 200) {
      const content = await response.json();
      console.log(content);
      captions = content.description.captions;
      tags = content.description.tags;
      state.drawing = false;
    } else {
      alert("Something went wrong");
    }
  }

  async function refreshToken() {
    const request = new Request("http://localhost/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("jwt-drawing-puffles-refresh"),
      }),
    });
    const response = await fetch(request);
    return await response.json();
  }
</script>

<div class="container">
  <div class="title">Do you think you can draw?</div>

  <div class="content">
    <div id="containerPainter" class="painter" bind:this={painterTarget} />
  </div>

  <div class="controls">
    {#if state.drawing}
      <button id="send-button" on:click={handleOnSendClick}
        >Let the puffles analyse your drawing</button
      >
    {:else}
      <div class="result-container">
        <p>
          {#each captions as caption}
            Puffles are {Math.round(caption.confidence * 100)}% that the drawing
            shows: {caption.text}
          {/each}
        </p>
        <p>
          {#if tags.length > 0}
            Some key ideas: {tags}
          {/if}
        </p>
      </div>
      <RetryButton on:click={handleRetryClick} />
    {/if}
  </div>

  <div class="footer">
    <Puffles />
  </div>
</div>

<style>
  .content {
    font-family: monospace !important;
  }

  .controls {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    background: #f1f1e6;
    padding-top: 10px;
    padding-right: 10px;
  }

  .title {
    display: flex;
    justify-content: space-around;
    font-size: 35px;
    font-family: monospace;
    color: #f1f1e6;
  }

  .container {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  #send-button {
    font-family: monospace;
    background-color: #984e57;
    color: #f1f1e6;
    padding: 15px 32px;
    font-size: 16px;
    cursor: pointer;
    margin: 4px 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .result-container {
    font-family: monospace;
    color: #f1f1e6;
  }

  .footer {
    display: flex;
  }
</style>
