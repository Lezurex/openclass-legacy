<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 3/30/21, 3:42 PM
  -->

<template>
  <div class="flex">
    <navbar v-if="global.API.auth.loggedIn"></navbar>
    <router-view class="flex-grow" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  mounted() {
    if (!global.API.auth.loggedIn) {
      this.$router.push("/login");
      console.log("Not logged in");
    } else {
      this.$router.push('/tasks');
      console.log("Logged in");
    }
  },
  computed: {
    global() {
      return global;
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>
