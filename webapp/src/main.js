/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 29.03.21, 21:39
 */

import App from './App.vue';

import './assets/tailwind.css';
import "./assets/style.css";
import { createApp } from 'vue';
import {loadLocaleMessages, setupI18n} from './i18n'
import en from './locales/en.json'

const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    locale: navigator.language,
    fallbackLocale: 'en',
    messages: {
        en
    }
});

defineLanguage();

async function defineLanguage() {
    for (let lang of navigator.languages) {
        let loaded = await loadLocaleMessages(i18n, lang);
        if (loaded) break;
    }
    createApp(App).use(i18n).mount('#app')
}