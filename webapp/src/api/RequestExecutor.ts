/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:24
 */
import {Notification} from "@/utils/Notification";
import Router from '@/router';
import {NotificationType} from "@/utils/NotificationType";

export default class RequestExecutor {
    /**
     * Builds an {@link XMLHttpRequest} ready to use for an API request.
     * @param path {String} Path in the API (HOST/api/ is already given)
     * @param method {String} HTTP request method to use (GET, POST, PATCH, DELETE, etc)
     * @returns {XMLHttpRequest}
     */
    buildXHR(path : string, method : string) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, window.location.origin + "/api/" + path);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener("load", async ev => {
            switch (xhr.status) {
                case 429:
                    new Notification(window.i18n.global.t("errors.429-title"), window.i18n.global.t("errors.429-desc"), NotificationType.ERROR);
                    break;
                case 500:
                    new Notification(window.i18n.global.t("errors.500-title"), window.i18n.global.t("errors.500-desc"), NotificationType.ERROR);
                    break;
                case 401:
                    new Notification(window.i18n.global.t("errors.401-title"), window.i18n.global.t("errors.401-desc"), NotificationType.ERROR);
                    window.API.auth.loggedIn.value = false;
                    await Router.push("/login");
                    break;
            }
        });
        xhr.addEventListener("error", ev => {
            new Notification(window.i18n.global.t("errors.no-connection-title"), window.i18n.global.t("errors.no-connection-desc"), NotificationType.ERROR);
        })
        return xhr;
    }

    isSuccessful(statusCode : number) {
        return statusCode >= 200 && statusCode < 300;
    }
}