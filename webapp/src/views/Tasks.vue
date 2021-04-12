<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 10.04.21, 00:28
  -->

<template>
<main>
  <h1 class="heading">{{ $t("tasks.title") }}</h1>
  <ul>
    <task-element v-for="task of tasks" :key="task.id" :task="task" :collapse-trigger="collapseTrigger" @collapse-all="collapseAll"></task-element>
  </ul>
</main>
</template>

<script>

import TaskElement from "@/components/TaskElement";

export default {
  data() {
    return {
      tasks: this.$store.getters['classes/getAllTasks'],
      collapseTrigger: 0
    }
  },
  mounted() {
    //console.log(this.tasks)
  },
  methods: {
    collapseAll() {
      this.collapseTrigger++;
    }
  },
  computed: {
    sorted() {
      // [...this.tasks]: Clone the array without reference
      return [...this.tasks].sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.date);
      })
    }
  },
  components: {
    "taskElement": TaskElement
  },
  name: "Tasks"
}
</script>

<style scoped>

</style>