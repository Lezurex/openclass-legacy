/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 30.04.21, 21:50
 */

import App from './App.vue';

import './assets/tailwind.css';
import "./assets/style.css";
import {createApp} from 'vue';
import {loadLocaleMessages, setI18nLanguage, setupI18n} from './i18n'
import en from './locales/en.json'
import APIManager from "@/api/APIManager";
import router from './router'
import NotificationManager from "@/utils/NotificationManager";
import store from './store';
import {I18n} from "vue-i18n";

const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    fallbackLocale: 'en',
    messages: {
        en
    },
    silentFallbackWarn: true
});

declare global {
    interface Window {
        API : APIManager,
        notificationManager : NotificationManager,
        i18n : I18n<unknown, unknown, unknown>
    }
}

window.API = new APIManager();
window.notificationManager = new NotificationManager();
window.i18n = i18n;

defineLanguage();

async function defineLanguage() {
    for (const lang of navigator.languages) {
        const loaded = await loadLocaleMessages(i18n, lang);
        if (loaded) {
            setI18nLanguage(i18n, lang);
            break;
        }
    }
    try {
        await window.API.auth.getStatus();
    } catch (e) {
        console.error("Failed to get status.")
    }
    createApp(App).use(router).use(i18n).use(store).mount('#app');
}