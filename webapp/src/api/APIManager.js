/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/1/21, 9:42 AM
 */

import Auth from "@/api/Auth";

export default class APIManager {

    #auth;

    constructor() {
        this.#auth = new Auth();
    }

    get auth() {
        return this.#auth;
    }

}
