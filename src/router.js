import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
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
  ]
});
