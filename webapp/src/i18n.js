/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 12.04.21, 21:03
 */
import {createI18n} from 'vue-i18n'

export function setupI18n(options = {locale: 'en'}) {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale)
    return i18n;
}

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        i18n.global.locale.value = locale
    }
    document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
    return new Promise(resolve => {
        import( `./locales/${locale}.json`).then(messages => {
            i18n.global.setLocaleMessage(locale, messages.default);
            i18n.global.setDateTimeFormat(locale, messages.default.dateFormat)
            console.log("Loaded locale " + locale);
            resolve(true);
        }).catch(() => {
            console.log("Locale '" + locale + "' is not available.");
            resolve(false);
        })
    })
}