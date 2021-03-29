<template>
  <main>
    <div class="sm:container bg-gray-800 rounded p-10 shadow border-2 border-gray-600">
      <label class="block mb-2">
        <span>E-Mail</span>
        <input placeholder="max.muserman@mustermail.de" class="input" type="email">
      </label>
      <label class="block">
        <span>Passwort</span>
        <input class="input" type="password">
      </label>
      <button class="btn mt-3">Login</button>
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