/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 2:52 PM
 */

import RequestExecutor from "@/api/RequestExecutor";

export default class Auth extends RequestExecutor {

    loggedIn = false;

    async login(email, password) {
        return new Promise((resolve, reject) => {
            let body = JSON.stringify({
                email: email,
                password: password
            });
            let xhr = this.buildXHR("auth/login", "POST");
            xhr.addEventListener("load", ev => {
                let resp;
                try {
                    resp = JSON.parse(xhr.responseText);
                } catch (e) {
                    resp = null;
                }
                if (this.isSuccessful(xhr.status)) {
                    resolve(resp);
                } else {
                    if (resp.code === 1011) {
                        resolve(resp);
                    } else {
                        resolve(resp);
                    }
                }
            });
            xhr.send(body);
        })
    }

    async getStatus() {
        return new Promise(resolve => {
            let xhr = this.buildXHR("auth", "GET");
            xhr.addEventListener("load", ev => {
                let resp = JSON.parse(xhr.responseText);
                this.loggedIn = resp.loggedIn;
                resolve(this.loggedIn);
            });
            xhr.send();
        })
    }

}