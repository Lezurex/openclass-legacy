<template>
  <main>
    <img src="https://tbz.ch/wp-content/themes/tbz/favicons/favicon.ico" alt="">
    <div class="card" id="login-div">
      <div class="card-header">
        <b>Login</b>
      </div>
      <div class="card-body">
        <input type="text" class="form-control">
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  methods: {
    async sendRequest() {
      await fetch('/api/auth/status', {
        method: "GET",
      });
    }
  }
}
</script>

<style scoped>
main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login-div {
  display: inline-block;
}
</style>