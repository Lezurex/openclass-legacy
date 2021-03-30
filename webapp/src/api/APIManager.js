/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 10:01 AM
 */

import Auth from "@/api/Auth";

export default class APIManager {

    #auth;
    #loggedIn;

    constructor() {
        this.#auth = new Auth();
    }

    get auth() {
        return this.#auth;
    }

    get loggedIn() {
        return this.#loggedIn;
    }
}
