<script>
  import { Route } from "svelte-routing";
  import Authenticate from "./Authenticate.svelte";
  import { token } from "./stores.js";

  export let path;
  export let component;

  // not the best check
  $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
  <Route {path} {component} />
{:else}
  <Route {path} component={Authenticate} />
{/if}
