<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 4/1/21, 5:47 PM
  -->

<template>
<li v-if="notification.type === 1" style="transition: 1s ease" class="bg-red-400 dark:bg-red-600 rounded" :class="notification.durationLeft < 1 ? 'opacity-0' : null">
  <div class="p-4">
    <p><b>{{notification.title}}</b></p>
    <p>{{notification.description}}</p>
  </div>
  <div class="relative pt-1">
    <div class="overflow-hidden h-2 text-xs flex bg-pink-200">
      <div :style="'width:' + progress + '%'" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
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
  data() {
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