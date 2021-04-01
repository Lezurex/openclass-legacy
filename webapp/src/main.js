/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 4/1/21, 3:28 PM
 */

import App from './App.vue';

import './assets/tailwind.css';
import "./assets/style.css";
import { createApp } from 'vue';
import {loadLocaleMessages, setI18nLanguage, setupI18n} from './i18n'
import en from './locales/en.json'
import APIManager from "@/api/APIManager";
import router from './router'
import NotificationManager from "@/utils/NotificationManager";

const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    fallbackLocale: 'en',
    messages: {
        en
    },
    silentFallbackWarn: true
});

global.API = new APIManager();
global.notificationManager = new NotificationManager();

defineLanguage();

async function defineLanguage() {
    for (let lang of navigator.languages) {
        let loaded = await loadLocaleMessages(i18n, lang);
        if (loaded) {
            setI18nLanguage(i18n, lang);
            break;
        }
    }
    await global.API.auth.getStatus();
    createApp(App).use(router).use(i18n).mount('#app');
}