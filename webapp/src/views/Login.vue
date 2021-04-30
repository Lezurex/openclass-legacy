<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 15.04.21, 19:46
  -->

<template>
  <main class="flex justify-center flex-nowrap flex-col">
    <h1 class="text-center text-5xl block w-full">OpenClass</h1>
    <div class="shadow-lg card mt-10">
      <label class="block mb-2">
        <span class="block">{{ $t('login.email') }}</span>
        <input v-model="email" @keyup.enter="login" :placeholder="$t('login.email-sample')" class="input" type="email">
      </label>
      <label class="block">
        <span class="block">{{ $t('login.password') }}</span>
        <input v-model="password" @keyup.enter="login" class="input" type="password">
      </label>
      <div class="flex mt-3 justify-between items-center flex-wrap">
        <button v-if="!loginPending" @click="login" class="btn mr-2">{{ $t('login.btn-login') }}</button>
        <button disabled v-else class="btn opacity-70 mr-2"><i class="fas fa-spinner spinner"></i></button>
        <span class="text-indigo-500 cursor-pointer">{{ $t('login.forgot-password-question') }}</span>
      </div>
    </div>
    <div class="absolute bottom-4 right-4">
      <a class="bottom-link" href="https://github.com/Lezurex/openclass">GitHub</a>
      <span class="bottom-link">Setup</span>
    </div>
  </main>
</template>

<script>
import {Notification} from "@/utils/Notification";

export default {
  data() {
    return {
      email: "",
      password: "",
      loginPending: false,
    }
  },
  name: "Login",
  methods: {
    async login() {
      if (this.email && this.password) {
        this.loginPending = true;
        try {
          let resp = await global.API.auth.login(this.email, this.password);
          if (resp === null) {
            await this.$store.dispatch("classes/loadClasses");
            await this.$router.push("/tasks");
            await global.API.auth.getStatus();
            new Notification(this.$t("login.success-title"), this.$t("login.success-desc"), Notification.TYPE.success, 200);
          } else {
            switch (resp.code) {
              case 1012: // Wrong credentials
                new Notification(this.$t("login.errors.wrong-credentials-title"), this.$t("login.errors.wrong-credentials-desc"), Notification.TYPE.error);
            }
          }
        } catch (e) {
          this.loginPending = false;
        }
        this.loginPending = false;
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