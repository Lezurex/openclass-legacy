/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:28
 */

import RequestExecutor from "@/api/RequestExecutor";
import {Task} from "@/entities/Task";
import {ref} from "vue";

export default class Tasks extends RequestExecutor {

    tasks = ref({});

    async getAllTasks() {
        return new Promise(resolve => {
            const xhr = this.buildXHR("tasks", "GET");
            xhr.addEventListener("load", ev => {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    Object.values(data).forEach(taskObj => {
                       Task.fromJSON(taskObj);
                    });
                    resolve(this.tasks.value);
                }
            });
            xhr.send();
        })
    }

}