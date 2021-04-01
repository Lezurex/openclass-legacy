<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 01.04.21, 21:19
  -->

<template>
  <li v-if="notification.type === 1" style="transition: 1s ease"
      class="bg-red-500 dark:bg-red-600 rounded mt-4 text-white"
      :class="notification.durationLeft < 1 ? 'opacity-0' : null">
    <div class="p-4">
      <p><b>{{ notification.title }}</b></p>
      <p>{{ notification.description }}</p>
    </div>
    <div class="relative pt-1">
      <div class="overflow-hidden h-2 text-xs flex bg-pink-200">
        <div :style="'width:' + progress + '%'"
             class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"></div>
      </div>
    </div>
  </li>
  <li v-if="notification.type === 2" style="transition: 1s ease"
      class="bg-blue-500 dark:bg-blue-600 rounded mt-4 text-white"
      :class="notification.durationLeft < 1 ? 'opacity-0' : null">
    <div class="p-4">
      <p><b>{{ notification.title }}</b></p>
      <p>{{ notification.description }}</p>
    </div>
    <div class="relative pt-1">
      <div class="overflow-hidden h-2 text-xs flex bg-indigo-200">
        <div :style="'width:' + progress + '%'"
             class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-400"></div>
      </div>
    </div>
  </li>
  <li v-if="notification.type === 3" style="transition: 1s ease"
      class="bg-green-500 dark:bg-green-600 rounded mt-4 text-white"
      :class="notification.durationLeft < 1 ? 'opacity-0' : null">
    <div class="p-4">
      <p><b>{{ notification.title }}</b></p>
      <p>{{ notification.description }}</p>
    </div>
    <div class="relative pt-1">
      <div class="overflow-hidden h-2 text-xs flex bg-green-200">
        <div :style="'width:' + progress + '%'"
             class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification: Object
  },
  computed: {
    progress() {
      return this.notification.durationLeft / this.notification.startDuration * 100;
    }
  }
}
</script>

<style scoped>

</style>