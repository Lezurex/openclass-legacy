/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:23
 */

import {Class} from "@/entities/Class";
import {Notification} from '@/utils/Notification';
import RequestExecutor from "@/api/RequestExecutor";
import {Task} from "@/entities/Task";
import {NotificationType} from "@/utils/NotificationType";

const state = () : {all : any} => ({
    all: {}
})

const getters = {
    getAllTasks(state : any) {
        const tasks: Task[] = [];
        Object.values(state.all).forEach((cObj : any) => Object.values(cObj.tasks).forEach((task : any) => tasks.push(task)))
        return tasks;
    }
}

const actions = {
    async loadClasses(context: { commit: (arg0: string, arg1: {}) => void; }) {
        return new Promise((resolve, reject) => {
            const req = new RequestExecutor().buildXHR("class?deep=1", "GET")
            req.addEventListener("load", () => {
                if (req.status === 200) {
                    const data = JSON.parse(req.responseText);
                    const classes : any = {};
                    Object.values(data).forEach(obj => {
                        const classObj = Class.fromJSONDeep(obj);
                        classes[classObj.id] = classObj;
                    })
                    context.commit("setClasses", classes)
                    // @ts-ignore
                    resolve(this.state.all);
                } else
                    reject();
            });
            req.send();
        })
    },
    async setTaskTick(context: { commit: (arg0: string, arg1: any[]) => void; state: { all: { [x: string]: { tasks: { [x: string]: { ticked: any; }; }; }; }; }; }, payload: any[]) {
        const task = payload[0];
        const value = payload[1];
        return new Promise<void>((resolve, reject) => {
            const req = new RequestExecutor().buildXHR("class/" + task.classObj.id + "/tasks/" + task.id + "/tick", value ? 'POST' : 'DELETE');
            req.addEventListener("load", async () => {
                if (req.status === 204) {
                    context.commit("setTaskTick", [task, value]);
                    resolve();
                } else {
                    new Notification(window.i18n.global.t("tasks.errors.tickingFailed-title"), window.i18n.global.t("tasks.errors.tickingFailed-desc"), NotificationType.ERROR);
                    await context.commit("setTaskTick", [task, !context.state.all[task.classObj.id].tasks[task.id].ticked]);
                    await context.commit("setTaskTick", [task, !context.state.all[task.classObj.id].tasks[task.id].ticked]);
                    reject();
                }
            });
            req.send();
        })
    }
}

const mutations = {
    /**
     * Sets the classes object
     * @param state
     * @param classes {{Number: Class}}
     */
    setClasses(state: { all: any; }, classes: any) {
        state.all = classes;
    },
    setTaskTick(state: { all: { [x: string]: { tasks: { [x: string]: { ticked: any; }; }; }; }; }, payload: any[]) {
        state.all[payload[0].classObj.id].tasks[payload[0].id].ticked = payload[1];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}