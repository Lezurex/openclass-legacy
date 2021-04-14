<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 4/13/21, 12:54 PM
  -->

<template>
<main class="sm:min-h-screen flex flex-col">
  <h1 class="heading">{{ $t("tasks.title") }}</h1>
  <div class="flex-grow flex mt-5" :class="allDone ? 'justify-center items-center' : ''">
    <div v-if="allDone" class="flex-grow h-full flex justify-center items-center flex-col">
      <i class="text-9xl" :class="randomAllDoneIcon()"></i>
      <span class="mt-5 text-xl text-center">{{ $t("tasks.allDone") }}</span>
    </div>
    <ul v-else class="flex-grow">
      <task-element v-for="task of sortedFiltered(showTicked ? 0 : 1)" :key="task.id" :task="task" @click="selectTask(task, $event)"></task-element>
    </ul>
    <task-details v-if="selectedTask" :task="selectedTask" @close-window="selectedTask = null"></task-details>
  </div>
  <span class="text-gray-500 mt-3 block cursor-pointer" @click="showTicked = !showTicked">{{ showTicked ? $t("tasks.hideTicked") : $t("tasks.showTicked") }}</span>
</main>
</template>

<script>

import TaskElement from "@/components/TaskElement";
import TaskDetails from "@/components/TaskDetails";

export default {
  data() {
    return {
      tasks: this.$store.getters['classes/getAllTasks'],
      selectedTask: null,
      showTicked: false
    }
  },
  mounted() {
  },
  methods: {
    selectTask(task, event) {
      this.selectedTask = task;
    },
    /**
     * Applies some filters to tasks
     * @param filterTicked {Number} 0: no filter 1: only ticked 2: only not-ticked
     * @returns {*[]}
     */
    sortedFiltered(filterTicked = 0) {
      // [...this.tasks]: Clone the array without reference
      let tasks = [...this.tasks].sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.date);
      });
      if (filterTicked === 1)
        tasks = tasks.filter(item => !item.ticked)
      if (filterTicked === 2)
        tasks = tasks.filter(item => item.ticked)
      return tasks;
    },
    randomAllDoneIcon() {
      let icons = [
          "fas fa-glass-cheers",
          "fas fa-cocktail",
          "fas fa-mug-hot"
      ];
      return icons[Math.floor(Math.random() * icons.length)];
    }
  },
  computed: {
      allDone() {
        try {
          this.sortedFiltered();
          return this.sortedFiltered(this.showTicked ? 0 : 1).length === 0 && !this.showTicked;
        } catch (exception) {
          return false;
        }
      }
  },
  components: {
    "taskElement": TaskElement,
    "taskDetails": TaskDetails
  },
  name: "Tasks"
}
</script>

<style scoped>
</style>