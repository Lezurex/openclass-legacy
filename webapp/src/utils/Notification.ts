/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:09
 */

import {Ref, ref} from "vue";
import {NotificationType} from "@/utils/NotificationType";

export class Notification {

    static idCount : number = 1;

    id : number;
    title : string;
    description : string;
    startDuration : number = 500;
    durationLeft : Ref<number>;
    type : NotificationType;

    /**
     * Creates a new {@link Notification} and appends it to the notification stack.
     * @param title {String}
     * @param description {String}
     * @param type {Notification.TYPE}
     * @param duration {Number}
     */
    constructor(title: string, description: string, type: NotificationType, duration = 500) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDuration = duration;
        this.durationLeft = ref(duration);
        this.id = Notification.idCount + 1;
        window.notificationManager.add(this);
        Notification.idCount++;
        this.countDown(this);
    }

    countDown(instance: this) {
        instance.durationLeft.value--;
        if (instance.durationLeft.value > 0)
            setTimeout(() => instance.countDown(instance), 10);
        else
            setTimeout(() => instance.delete(instance), 2000)
    }

    delete(instance: this) {
        window.notificationManager.remove(instance);
    }

}