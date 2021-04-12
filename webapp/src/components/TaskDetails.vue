<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 12.04.21, 22:01
  -->

<template>
  <div id="container" class="card absolute rounded-none bg-gray-200 right-0 top-0 h-full w-full origin-bottom md:origin-right md:w-1/3">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl heading">{{ task.title }}</h2>
      <i class="fas fa-times text-2xl cursor-pointer" @click="closeWindow()"></i>
    </div>
    <div id="contents" class="mt-3">
      <div class="grid grid-cols-2">
        <b>{{ $t('tasks.subject') + ':' }}</b><span>{{ task.subject.name }} {{ task.subject.teacher ? '(' + task.subject.teacher + ')' : '' }}</span>
        <b>{{ $t('tasks.date') + ':' }}</b><span>{{ $d(task.dueDate, 'middle') }}</span>
      </div>
      <b class="mt-3 block">{{ $t('tasks.desc') }}</b>
<!--      Add description styles for links, etc-->
      <div v-html="task.body"></div>
    </div>
  </div>
</template>

<script>
import {Task} from "@/entities/Task";

export default {
  name: "TaskDetails",
  props: {
    task: Task
  },
  emits: [
      "close-window"
  ],
  mounted() {
    document.getElementById("container").classList.add("slide-animation-in");
  },
  methods: {
    closeWindow() {
      document.getElementById("container").classList.add("slide-animation-out");
      let that = this;
      setTimeout(() => that.$emit("close-window"), 190);
    }
  }
}
</script>

<style scoped>

#container {
  @apply p-5
}

.slide-animation-in {
  transform-origin: right;
  animation: slide-in ease 200ms;
}

.slide-animation-out {
  transform-origin: right;
  animation: slide-out ease forwards 200ms;
}

@keyframes slide-in {
  0% {
    transform: scaleX(0)
  }
  100% {
    transform: scaleX(1)
  }
}

@keyframes slide-out {
  0% {
    transform: scaleX(1)
  }
  100% {
    transform: scaleX(0)
  }
}
</style>