<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 4/1/21, 11:15 AM
  -->

<template>
  <div class="flex">
    <navbar v-if="loggedIn"></navbar>
    <router-view class="flex-grow p-4" :class="loggedIn ? 'nav-inset' : null"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import {watch} from "@vue/runtime-core";

export default {
  data() {
    return {
      loggedIn: global.API.auth.loggedIn
    }
  },
  mounted() {
    if (!global.API.auth.isLoggedIn()) {
      this.$router.push("/login");
      console.log("Not logged in");
    } else {
      this.$router.push('/tasks');
      console.log("Logged in");
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>

@media only screen and (min-width: 640px) {
  .nav-inset {
    margin-left: 5rem;
  }
}

@media only screen and (max-width: 640px) {
  .nav-inset {
    margin-bottom: 5rem;
  }
}

</style>
