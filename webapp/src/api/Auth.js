/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/1/21, 11:14 AM
 */

import RequestExecutor from "@/api/RequestExecutor";
import {ref} from 'vue';

export default class Auth extends RequestExecutor {

    loggedIn = ref(false);

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
                this.loggedIn.value = resp.loggedIn;
                resolve(this.loggedIn.value);
            });
            xhr.send();
        })
    }

    isLoggedIn() {
        return this?.loggedIn.value;
    }

}