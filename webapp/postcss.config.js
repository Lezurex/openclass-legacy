/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 29.03.21, 11:25
 */

const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss,
        autoprefixer,
    ],
};