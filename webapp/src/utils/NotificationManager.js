/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/1/21, 4:16 PM
 */

import {ref} from "vue";

export default class NotificationManager {

    notifications = ref([]);

    /**
     * Adds a notification to the notification stack
     * @param notification {Notification}
     */
    add(notification) {
        this.notifications.value.push(notification);
    }

    remove(notification) {
        delete this.notifications.value[this.notifications.value.indexOf(notification)];
    }

}