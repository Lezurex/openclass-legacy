/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/1/21, 10:40 AM
 */

const Bcrypt = require('bcrypt');
Bcrypt.hash("admin", 10, async (err, hash) => {
    if (err) throw err;
    console.log(hash);
});