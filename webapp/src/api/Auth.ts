/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:50
 */

import RequestExecutor from "@/api/RequestExecutor";
import {ref} from 'vue';
import store from '@/store';
import {User} from "@/entities/User";

export default class Auth extends RequestExecutor {

    loggedIn = ref(false);

    async login(email : string, password : string) {
        return new Promise((resolve, reject) => {
            const body = JSON.stringify({
                email: email,
                password: password
            });
            const xhr = this.buildXHR("auth/login", "POST");
            xhr.addEventListener("load", ev => {
                let resp;
                try {
                    resp = JSON.parse(xhr.responseText);
                } catch (e) {
                    resp = null;
                }
                this.getStatus();
                if (this.isSuccessful(xhr.status)) {
                    resolve(resp);
                } else {
                    if (!resp || !resp.code) {
                        reject();
                        return;
                    }
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
        return new Promise((resolve, reject) => {
            const xhr = this.buildXHR("auth", "GET");
            xhr.addEventListener("load", ev => {
                if (xhr.responseText.startsWith("{")) {
                    const resp = JSON.parse(xhr.responseText);
                    this.loggedIn.value = resp.loggedIn;
                    if (resp.loggedIn) {
                        store.dispatch("setActiveUser", [User.fromJSON(resp.user)])
                    } else {
                        store.dispatch("setActiveUser", [null])
                    }
                    resolve(this.loggedIn.value);
                } else
                    reject();
            });
            xhr.send();
        })
    }

    isLoggedIn() {
        return this?.loggedIn.value;
    }

}