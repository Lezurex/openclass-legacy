<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 3/30/21, 2:03 PM
  -->

<template>
  <div class="flex">
    <navbar></navbar>
    <router-view class="flex-grow" />
  </div>
</template>

<script>
export default {
  mounted() {
    if (!global.API.auth.loggedIn) {
      this.$router.push("/login");
      console.log("Logged in.")
    }
  }
}
</script>

<style>

</style>
