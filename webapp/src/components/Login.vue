<template>
  <main class="flex justify-center flex-nowrap flex-col">
    <h1 class="text-center text-5xl block w-full">OpenClass</h1>
    <div class="card mt-10">
      <label class="block mb-2">
        <span class="block">E-Mail</span>
        <input placeholder="max.mustermann@mustermail.de" class="input" type="email">
      </label>
      <label class="block">
        <span class="block">Passwort</span>
        <input class="input" type="password">
      </label>
      <div class="flex mt-3 justify-between items-center">
        <button class="btn">Login</button>
        <span class="text-indigo-500 cursor-pointer">Passwort vergessen?</span>
      </div>
    </div>
    <div class="fixed bottom-3 right-3">
      <a class="bottom-link" href="https://github.com/Lezurex/openclass">GitHub</a>
      <span class="bottom-link">Setup</span>
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

.bottom-link {
  @apply text-gray-700 hover:text-gray-500 cursor-pointer transition pl-2;
}
</style>