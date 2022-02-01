<script>
	import { onMount } from "svelte";
	import Painter from "spainter";
	import "spainter/index.css";

	let containerPainter;

	onMount(() => {
		new Painter(containerPainter, {
			onBlobPaste: function (blob) {
				console.log('received', blob);
			},
		});
	});
</script>

<div class="painter" bind:this={containerPainter} />

<style>
  .painter {
    width: 550px;
    height: 565px;
  }
</style>
