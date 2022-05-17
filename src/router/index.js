import store from '../store/index';
import { createRouter, createWebHashHistory } from 'vue-router';

import Settings from '../settings.json';

import EggView from '@/views/EggView';
import MobilePhone from '../views/MindexView.vue';
import PersonalComputer from '../views/PindexView.vue';

import MobilePhone_Home from '../component/Mobile/HomePage.vue';
import MobilePhone_Info from '../component/Mobile/InfoPage.vue';
import MobilePhone_Create from '../component/Mobile/CreatePage.vue';

import PersonalComputer_Home from '../component/Computer/HomePage.vue';
import PersonalComputer_Info from '../component/Computer/InfoPage.vue';
import PersonalComputer_Create from '../component/Computer/CreatePage.vue';
import PersonalComputer_Browse from '../component/Computer/BrowsePage.vue';

const routes = [
  {
    path: '/m',
    component: MobilePhone,
    meta: {
      title: '头像制作'
    },
    children: [
      {
        path: 'home',
        component: MobilePhone_Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'create',
        component: MobilePhone_Create,
        meta: {
          title: '制作头像'
        }
      },
      {
        path: 'info',
        component: MobilePhone_Info,
        meta: {
          title: '关于'
        }
      },
      {
        path: ':match(.*)',
        redirect: '/m/home'
      }
    ]
  },
  {
    path: '/p',
    component: PersonalComputer,
    meta: {
      title: '头像制作'
    },
    children: [
      {
        path: 'egg',
        component: EggView,
        meta: {
          title: '加入我们'
        }
      },
      {
        path: 'home',
        component: PersonalComputer_Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'browse',
        component: PersonalComputer_Browse,
        meta: {
          title: '浏览头像'
        }
      },
      {
        path: 'create',
        component: PersonalComputer_Create,
        meta: {
          title: '制作头像'
        }
      },
      {
        path: 'info',
        component: PersonalComputer_Info,
        meta: {
          title: '关于'
        }
      },
      {
        path: ':match(.*)',
        redirect: '/p/home'
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('setUserAgent', navigator.userAgent);
  const alpha = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile)/i;
  const beta = /(MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  if (navigator.userAgent.match(alpha) || navigator.userAgent.match(beta) || document.body.clientWidth < 1024) {
    let dest = to.path;
    if (dest.indexOf('/p') === 0) {
      router.push('/m' + dest.substring(2)).then();
    } else if (dest.indexOf('/m') !== 0) {
      router.push('/m' + dest).then();
    } else {
      next();
    }
  } else {
    let dest = to.path;
    if (dest.indexOf('/m') === 0) {
      router.push('/p' + dest.substring(2)).then();
    } else if (dest.indexOf('/p') !== 0) {
      router.push('/p' + dest).then();
    } else {
      next();
    }
  }
});

router.afterEach((to) => {
  if (
    to.matched.filter(function (i) {
      return i.meta['title'];
    }).length > 0
  ) {
    let title = '';
    to.matched.forEach(function (i) {
      title += ' - ' + i.meta['title'];
    });
    document.title = Settings['titlePrefix'] + title.substring(3).trim();
  }
});

export default router;
