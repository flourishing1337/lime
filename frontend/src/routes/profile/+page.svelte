<script>
  export let data;
  let { user } = data;
</script>

<h1>Välkommen, {user.email}</h1>
<p>Ditt användar-ID: {user.id}</p>
