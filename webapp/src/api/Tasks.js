/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 02.04.21, 10:18
 */

import RequestExecutor from "@/api/RequestExecutor";

export default class Tasks extends RequestExecutor {

    async getAllTasks() {
        return new Promise(resolve => {
            let xhr = this.buildXHR("tasks", "GET");
            xhr.addEventListener("load", ev => {
                if (xhr.status === 200) {

                }
            })
        })
    }

}