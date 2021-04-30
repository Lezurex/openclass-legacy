/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:27
 */

import {ref} from "vue";

export class Notification {

    static TYPE = {
        error: 1,
        info: 2,
        success: 3
    }
    static idCount = 1;

    id;
    title;
    description;
    startDuration = 500;
    durationLeft;
    type;

    /**
     * Creates a new {@link Notification} and appends it to the notification stack.
     * @param title {String}
     * @param description {String}
     * @param type {Notification.TYPE}
     * @param duration {Number}
     */
    constructor(title, description, type, duration = 500) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDuration = duration;
        this.durationLeft = ref(duration);
        this.id = Notification.idCount + 1;
        global.notificationManager.add(this);
        Notification.idCount++;
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