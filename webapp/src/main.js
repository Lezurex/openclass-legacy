/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 3/30/21, 10:14 AM
 */

import App from './App.vue';

import './assets/tailwind.css';
import "./assets/style.css";
import { createApp } from 'vue';
import {loadLocaleMessages, setupI18n} from './i18n'
import en from './locales/en.json'
import APIManager from "@/api/APIManager";

const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    locale: navigator.language,
    fallbackLocale: 'en',
    messages: {
        en
    }
});

const API = new APIManager();
API.auth.login("max.mustermann@mustermail.de", "Musterpasswort123!");

defineLanguage();

async function defineLanguage() {
    for (let lang of navigator.languages) {
        let loaded = await loadLocaleMessages(i18n, lang);
        if (loaded) break;
    }
    createApp(App).use(i18n).mount('#app')
}