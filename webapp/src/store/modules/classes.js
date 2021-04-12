/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 11.04.21, 21:34
 */

import {Class} from "@/entities/Class";

const state = () => ({
    all: {}
})

const getters = {
    getAllTasks(state) {
        let tasks = [];
        console.log("All tasks")
        console.log(state.all)
        Object.values(state.all).forEach(cObj => Object.values(cObj.tasks).forEach(task => tasks.push(task)))
        return tasks;
    }
}

const actions = {
    async loadClasses(context) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open("GET", window.location.origin + "/api/class?deep=1")
            req.addEventListener("load", () => {
                if (req.status === 200) {
                    let data = JSON.parse(req.responseText);
                    let classes = {};
                    Object.values(data).forEach(obj => {
                        let classObj = Class.fromJSONDeep(obj);
                        classes[classObj.id] = classObj;
                    })
                    context.commit("setClasses", classes)
                    resolve(this.state.all);
                } else
                    reject();
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
    setClasses(state, classes) {
        state.all = classes;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}