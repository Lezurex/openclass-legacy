<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 02.04.21, 10:38
  -->

<template>
<main>
  <h1>TASKS juhu</h1>
  <ul>
    <li v-for="task of tasks" :key="task.id">{{task.title}}</li>
  </ul>
</main>
</template>

<script>
export default {
  data() {
    return {
      tasks: global.tasks
    }
  },
  mounted() {
    global.API.tasks
  },
  computed: {
    sorted() {
      return Object.values(this.tasks).sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.date);
      })
    }
  },
  name: "Tasks"
}
</script>

<style scoped>

</style>