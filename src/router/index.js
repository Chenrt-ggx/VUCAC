import Settings from "../settings.json";
import MobliePhone from "../views/Mindex.vue";
import PersonalComputer from "../views/Pindex.vue";

import MobliePhone_Home from "../component/Moblie/Home.vue";
import MobliePhone_Info from "../component/Moblie/Info.vue";
import MobliePhone_Create from "../component/Moblie/Create.vue";

import PersonalComputer_Home from "../component/Computer/Home.vue";
import PersonalComputer_Info from "../component/Computer/Info.vue";
import PersonalComputer_Create from "../component/Computer/Create.vue";
import PersonalComputer_Browse from "../component/Computer/Browse.vue";

import store from "../store/index";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/m",
        component: MobliePhone,
        meta: {
            title: "头像制作",
            requiresAuth: false,
        },
        children: [
            {
                path: "home",
                component: MobliePhone_Home,
                meta: {
                    title: "首页",
                    requiresAuth: false,
                },
            },
            {
                path: "create",
                component: MobliePhone_Create,
                meta: {
                    title: "制作头像",
                    requiresAuth: false,
                },
            },
            {
                path: "info",
                component: MobliePhone_Info,
                meta: {
                    title: "关于",
                    requiresAuth: false,
                },
            },
            {
                path: ":match(.*)",
                redirect: "/m/home",
            },
        ],
    },
    {
        path: "/p",
        component: PersonalComputer,
        meta: {
            title: "头像制作",
            requiresAuth: false,
        },
        children: [
            {
                path: "home",
                component: PersonalComputer_Home,
                meta: {
                    title: "首页",
                    requiresAuth: false,
                },
            },
            {
                path: "browse",
                component: PersonalComputer_Browse,
                meta: {
                    title: "浏览头像",
                    requiresAuth: false,
                },
            },
            {
                path: "create",
                component: PersonalComputer_Create,
                meta: {
                    title: "制作头像",
                    requiresAuth: false,
                },
            },
            {
                path: "info",
                component: PersonalComputer_Info,
                meta: {
                    title: "关于",
                    requiresAuth: false,
                },
            },
            {
                path: ":match(.*)",
                redirect: "/p/home",
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

router.beforeEach((to, from, next) => {
    let flag =
        navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC)/i
        ) ||
        navigator.userAgent.match(
            /(Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|MicroMessenger)/i
        );
    store.commit("setUserAgent", navigator.userAgent);
    if (flag) {
        let dest = to.path;
        if (dest.indexOf("/p") === 0) {
            dest = "/m" + dest.substring(2);
            router.push(dest);
        } else if (dest.indexOf("/m") !== 0) {
            dest = "/m" + dest;
            router.push(dest);
        } else {
            next();
        }
    } else {
        let dest = to.path;
        if (dest.indexOf("/m") === 0) {
            dest = "/p" + dest.substring(2);
            router.push(dest);
        } else if (dest.indexOf("/p") !== 0) {
            dest = "/p" + dest;
            router.push(dest);
        } else {
            next();
        }
    }
});

router.afterEach((to, from, next) => {
    if (
        to.matched.filter(function (i) {
            return i.meta.title;
        }).length > 0
    ) {
        let title = "";
        to.matched.forEach(function (i) {
            title += " - " + i.meta.title;
        });
        document.title = Settings["titlePrefix"] + title.substring(3).trim();
    }
});
