<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 01.04.21, 21:49
  -->

<template>
  <ul class="fixed bottom-5 right-5 z-10 overflow-y-scroll max-h-full notification-list max-w-sm">
    <notification v-for="notification of notifications" :key="notification.id" :notification="notification"></notification>
  </ul>
  <div class="flex">
    <navbar v-if="loggedIn"></navbar>
    <router-view class="flex-grow p-4" :class="loggedIn ? 'nav-inset' : null"/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import NotificationObj from '@/utils/Notification';

export default {
  data() {
    return {
      loggedIn: global.API.auth.loggedIn,
      notifications: global.notificationManager.notifications,
    }
  },
  mounted() {
    if (!global.API.auth.isLoggedIn()) {
      this.$router.push("/login");
    } else {
      this.$router.push('/tasks');
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
    margin-left: 5rem;
  }
}

@media only screen and (max-width: 640px) {
  .nav-inset {
    margin-bottom: 5rem;
  }
}

.notification-list::-webkit-scrollbar {
  display: none;
}

</style>
