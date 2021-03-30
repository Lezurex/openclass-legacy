/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 10:35 AM
 */

import RequestExecutor from "@/api/RequestExecutor";

export default class Auth extends RequestExecutor {

    async login(email, password) {
        return new Promise((resolve, reject) => {
            let body = JSON.stringify({
                email: email,
                password: password
            });
            let xhr = this.buildXHR("auth/login", "POST");
            xhr.addEventListener("load", ev => {
                if (this.isSuccessful(xhr.status)) {
                    resolve();
                } else {
                    let error = JSON.parse(xhr.responseText);
                    if (error.code === 1011) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            })
            xhr.send(body);
        })
    }

    async getState() {
        return new Promise(resolve => {

        })
    }

}