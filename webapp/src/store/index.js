/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 11.04.21, 21:35
 */

import {createStore} from "vuex";
import classes from './modules/classes';

export default createStore({
    modules: {
        classes
    }
})