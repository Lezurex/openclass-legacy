/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 29.03.21, 21:37
 */

module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3080',
                changeOrigin: true
            },
        }
    },

    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "OpenClass";
                return args;
            })
    },

    pluginOptions: {}
}
