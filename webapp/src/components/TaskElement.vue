<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 12.04.21, 14:05
  -->

<template>
  <li class="card task-element">
    <div @click="toggleExpanded" class="flex justify-between items-center">
      {{task.subject.name}}
      <button class="btn">{{ expanded ? '&uarr;' : '&darr;' }}</button>
    </div>
    <div id="body" :style="'height: ' + expandHeight + 'px'" class="body" :class="expanded ? 'expanded' : ''">Expanded!<br><br><br><br></div>
  </li>
</template>

<script>
import {Task} from "@/entities/Task";

export default {
  name: "TaskElement",
  props: {
    task: Task,
    collapseTrigger: Number
  },
  data() {
    return {
      expanded: false,
      expandHeight: 0
    }
  },
  methods: {
    toggleExpanded() {
      let body = document.getElementById("body");

      if (!this.expanded) {
        this.$emit("collapse-all");
        setTimeout(() => {
          this.expandHeight = body.scrollHeight;
          this.expanded = true;
        }, 10);
      } else {
        this.expandHeight = 0;
        this.expanded = false;
      }
    }
  },
  watch: {
    collapseTrigger() {
      this.expandHeight = 0;
      this.expanded = false;
    }
  },
  emits: [
    "collapse-all"
  ]
}
</script>

<style scoped>
.task-element {
  @apply p-5 mt-3
}

.body {
  overflow: hidden;
  transition: 200ms ease;
}
</style>