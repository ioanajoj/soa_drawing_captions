<script>
  import { Router, Route } from "svelte-routing";

  import ProtectedRoute from "./ProtectedRoute.svelte";

  import Authenticate from "./Authenticate.svelte";
  import Draw from "./Draw.svelte";
</script>

<Router>
  <Route path="/auth" component={Authenticate} />
  <ProtectedRoute path="/" component={Draw} />
</Router>
