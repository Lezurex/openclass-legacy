<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 3/30/21, 1:58 PM
  -->

<template>
  <main class="flex justify-center flex-nowrap flex-col">
    <h1 class="text-center text-5xl block w-full">OpenClass</h1>
    <div class="shadow-lg card mt-10">
      <label class="block mb-2">
        <span class="block">{{ $t('login.email') }}</span>
        <input v-model="email" :placeholder="$t('login.email-sample')" class="input" type="email">
      </label>
      <label class="block">
        <span class="block">{{ $t('login.password') }}</span>
        <input v-model="password" class="input" type="password">
      </label>
      <div class="flex mt-3 justify-between items-center flex-wrap">
        <button @click="login" class="btn mr-2">{{ $t('login.btn-login') }}</button>
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
  data() {
    return {
      email: "",
      password: "",
    }
  },
  name: "Login",
  methods: {
    async login() {
      if (this.email && this.password) {
        let resp = await global.API.auth.login(this.email, this.password);
        if (resp.status === "success") {
          this.$router.push("/");
        }
      }
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