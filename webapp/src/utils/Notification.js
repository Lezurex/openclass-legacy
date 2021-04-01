/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/1/21, 5:46 PM
 */

import {ref} from "vue";

export default class Notification {

    static TYPE = {
        error: 1,
        info: 2,
        success: 3
    }

    title;
    description;
    startDuration = 500;
    durationLeft;
    type;

    /**
     * Creates a new {@link Notification} and appends it to the information stack.
     * @param title {String}
     * @param description {String}
     * @param type {Error.ERROR_TYPE}
     * @param duration {Number}
     */
    constructor(title, description, type, duration = 500) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDuration = duration;
        this.durationLeft = ref(duration);
        global.notificationManager.add(this);
        this.countDown(this);
    }

    countDown(instance) {
        instance.durationLeft.value--;
        if (instance.durationLeft.value > 0)
            setTimeout(() => instance.countDown(instance), 10);
        else
            setTimeout(() => instance.delete(instance), 2000)
    }

    delete(instance) {
        global.notificationManager.remove(instance);
    }

}