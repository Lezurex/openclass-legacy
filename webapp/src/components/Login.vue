<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 29.03.21, 21:27
  -->

<template>
  <main class="flex justify-center flex-nowrap flex-col">
    <h1 class="text-center text-5xl block w-full">OpenClass</h1>
    <div class="shadow-lg card mt-10">
      <label class="block mb-2">
        <span class="block">{{ $t('login.email') }}</span>
        <input :placeholder="$t('login.email-sample')" class="input" type="email">
      </label>
      <label class="block">
        <span class="block">{{ $t('login.password') }}</span>
        <input class="input" type="password">
      </label>
      <div class="flex mt-3 justify-between items-center flex-wrap">
        <button class="btn mr-2">{{ $t('login.btn-login') }}</button>
        <span class="text-indigo-500 cursor-pointer">{{ $t('login.forgot-password-question') }}</span>
      </div>
    </div>
    <div class="fixed bottom-4 right-4">
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