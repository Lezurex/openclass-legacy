/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/13/21, 8:16 AM
 */

import {createStore, createLogger} from "vuex";
import classes from './modules/classes';

export default createStore({
    modules: {
        classes
    },
    store() {
        return {
            activeUser: null
        }
    },
    actions: {
        setActiveUser(context, {user}) {
            context.commit("setUser", [user])
        }
    },
    mutations: {
        setUser(store, {user}) {
            store.activeUser = user;
        }
    },
    plugins: [createLogger()]
})