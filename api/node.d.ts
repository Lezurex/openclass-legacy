/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 8/7/21, 12:59 AM
 */

import {Database} from './database/Database';

declare global {
    namespace NodeJS {
        interface Global {
            db: Database,
            roles: any
            classes: any
            users: any
            subjects: any,
            classRelations: any,
            tasks: any,
            ticks: any
        }
    }
}
