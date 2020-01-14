import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: () => import(/* webpackChunkName: "mobile" */ './views/Mobile.vue')
    },
    {
      path: '/folder',
      name: 'folder',
      component: () => import(/* webpackChunkName: "folder" */ './views/Folder.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'folder') {
    document.body.style.backgroundColor = '#000000cc';
    document.body.style.color = 'white';
  } else if (to.name === 'mobile') {
    document.body.style.backgroundColor = '#000000cc';
  }
  next();
});

export default router;
