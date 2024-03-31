import { createRouter, createWebHistory } from "vue-router";
import { app } from './main'
import App from "./App.vue";
import Ucs from "./components/Ucs.vue";
import Modules from "./components/Modules.vue";
import JSONViewer from "./components/JSONViewer.vue";
import { showJSONFitxerMenu } from './config';


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Ucs },
        { path: "/ucs", component: Ucs },
        { path: "/modules", component: Modules},
        { ...showJSONFitxerMenu ? {path: "/json", component: JSONViewer}:[]}
    ]
});