/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 2:28 PM
 */
// From https://github.com/intlify/vue-i18n-next/blob/master/examples/lazy-loading/webpack/src/i18n.js
import {nextTick} from 'vue'
import {createI18n} from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'ja']

export function setupI18n(options = {locale: 'en'}) {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale)
    return i18n
}

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        i18n.global.locale.value = locale
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
    return new Promise(resolve => {
        import(
            /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
            ).then(messages => {
            // set locale and locale message
            i18n.global.setLocaleMessage(locale, messages.default);
            console.log("Loaded locale " + locale);
            resolve(true);
        }).catch(() => {
            console.log("Locale '" + locale + "' is not available.");
            resolve(false);
        })
    })
}