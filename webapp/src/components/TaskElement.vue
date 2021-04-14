<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 4/13/21, 3:39 PM
  -->

<template>
  <li class="card task-element cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <input type="checkbox" class="checkbox checkbox-big mr-5" :checked="task.ticked" @change="setTick($event)" @click.stop>
        <div class="flex flex-col">
          <div>
            <b>{{task.subject.name}}</b>:
            {{task.title}}
          </div>
          <div>
            {{ $d(task.dueDate, 'middle') }}
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import {Task} from "@/entities/Task";

export default {
  name: "TaskElement",
  props: {
    task: Task,
  },
  data() {
    return {

    }
  },
  methods: {
    async setTick(event) {
      await this.$store.dispatch("classes/setTaskTick", [this.task, event.target.checked]);
    }
  }
}
</script>

<style scoped>
.task-element {
  @apply p-5 mt-3
}
</style>