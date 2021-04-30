<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 4/16/21, 3:18 PM
  -->

<template>
  <ul class="fixed bottom-5 right-5 z-30 overflow-y-scroll max-h-full notification-list max-w-sm">
    <notification v-for="notification of notifications" :key="notification.id" :notification="notification"></notification>
  </ul>
  <div class="flex">
    <navbar id="navbar" v-if="loggedIn"></navbar>
    <router-view class="flex-grow p-4 min-h-full" :class="loggedIn ? 'nav-inset' : null" v-if="loaded"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";

export default {
  data() {
    return {
      loggedIn: global.API.auth.loggedIn,
      notifications: global.notificationManager.notifications,
      loaded: false
    }
  },
  mounted() {
    if (!global.API.auth.isLoggedIn()) {
      this.$router.push("/login");
      this.loaded = true;
    } else {
      this.$store.dispatch("classes/loadClasses").then(() => {
        this.loaded = true;
        this.$router.push('/tasks');
      });
    }
  },
  components: {
    Navbar,
    Notification
  }
}
</script>

<style scoped>

@media only screen and (min-width: 640px) {
  .nav-inset {
    @apply ml-20;
    transition: 150ms ease;
  }
  #navbar:hover ~ .nav-inset {
    @apply ml-64;
    transition: 150ms ease;
  }

}

@media only screen and (max-width: 640px) {
  .nav-inset {
    margin-bottom: 5rem;
  }
}

.notification-list {
  scrollbar-width: none;
}

.notification-list::-webkit-scrollbar {
  display: none;
}

</style>
