/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 02.04.21, 10:18
 */

import RequestExecutor from "@/api/RequestExecutor";
import Task from "@/entities/Task";

export default class Tasks extends RequestExecutor {

    async getAllTasks() {
        return new Promise(resolve => {
            let xhr = this.buildXHR("tasks", "GET");
            xhr.addEventListener("load", ev => {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    let newTasks = {};
                    let promises = [];
                    Object.values(data).forEach(taskObj => {
                        promises.push(new Promise(singleResolve => {
                            Task.fromJSON(taskObj).then(task => {
                                newTasks[task.id] = task;
                            });
                        }))
                    });
                    Promise.all(promises).then(value => {
                        global.tasks = newTasks;
                        resolve(global.tasks);
                    })

                }
            })
        })
    }

}