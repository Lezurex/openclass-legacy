/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 22:09
 */

import {Ref, ref} from "vue";
import {Notification} from "@/utils/Notification";

export default class NotificationManager {

    notifications : Ref<Notification[]> = ref([]);

    /**
     * Adds a notification to the notification stack
     * @param notification {Notification}
     */
    add(notification: Notification) {
        this.notifications.value.push(notification);
    }

    remove(notification: Notification) {
        this.notifications.value = this.notifications.value.filter(candidate => candidate.id !== notification.id);
    }

}