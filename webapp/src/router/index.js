/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 12:38 PM
 */

import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login";

const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
