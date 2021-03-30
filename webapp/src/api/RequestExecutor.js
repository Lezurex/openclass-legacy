/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 10:32 AM
 */

export default class RequestExecutor {
    /**
     * Builds an {@link XMLHttpRequest} ready to use for an API request.
     * @param path {String} Path in the API (HOST/api/ is already given)
     * @param method {String} HTTP request method to use (GET, POST, PATCH, DELETE, etc)
     * @returns {XMLHttpRequest}
     */
    buildXHR(path, method) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, window.location.origin + "/api/" + path);
        xhr.setRequestHeader("Content-type", "application/json");
        return xhr;
    }

    isSuccessful(statusCode) {
        return statusCode >= 200 && statusCode < 300;
    }
}