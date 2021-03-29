/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 29.03.21, 21:39
 */

import App from './App.vue';

import './assets/tailwind.css';
import "./assets/style.css";
import Vue from 'vue';
import i18next from "i18next";
import VueI18Next from "@panter/vue-i18next";
import Fetch from 'i18next-fetch-backend';

i18next.use(Fetch);
i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
});

const i18n = new VueI18Next(i18next);

Vue.createApp(App).use(i18n).mount('#app')
