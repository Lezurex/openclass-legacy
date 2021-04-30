/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:09
 */

import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Tasks from "@/views/Tasks.vue";
import Classes from "@/views/Classes.vue";

const routes : any[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/classes',
    name: 'Classes',
    component: Classes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
