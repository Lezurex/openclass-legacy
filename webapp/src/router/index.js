/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 3:45 PM
 */

import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login";
import Tasks from "@/views/Tasks";
import Classes from "@/views/Classes";

const routes = [
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
