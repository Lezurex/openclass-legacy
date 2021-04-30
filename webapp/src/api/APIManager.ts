/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:27
 */

import Auth from "@/api/Auth";
import Tasks from "@/api/Tasks";

export default class APIManager {

    #auth;
    #tasks;

    constructor() {
        this.#auth = new Auth();
        this.#tasks = new Tasks();
    }

    get auth() {
        return this.#auth;
    }
    get tasks() { return this.#tasks }
}
