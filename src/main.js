import 'normalize.css';
import '@/main.css';

import {
  Input,
  Button,
  Form,
  FormItem,
  Icon,
  Radio,
  RadioGroup,
  RadioButton,
  InputNumber,
  Dialog,
  Image,
  Drawer,
  Tabs,
  TabPane,
  Message,
  MessageBox,
  Notification,
  Loading,
} from 'element-ui';

import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import base64 from './utils/base64';

const isTouch = 'ontouchend' in document;

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1,
  error: isTouch ? base64.mobileError : base64.error,
  loading: isTouch ? base64.mobileLoading : base64.loading,
  attempt: 1,
  adapter: {
    error ({ src }) {
      console.log('v-lazy img load error with url : ' + src);
    }
  }
});

Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(InputNumber);
Vue.use(Dialog);
Vue.use(Image);
Vue.use(Drawer);
Vue.use(Tabs);
Vue.use(TabPane);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;

Vue.prototype.$getImgPath = (n) => {
  if (window.location.href.includes('file://')) {
    return n;
  } else {
    const chars = [{
      reg: /\#/g,
      str: '<0>',
    }, {
      reg: /\%/g,
      str: '<1>',
    }, {
      reg: /\&/g,
      str: '<2>',
    }, {
      reg: /\+/g,
      str: '<3>',
    }];
    const file = chars.reduce((f, c) => f.replace(c.reg, c.str), n);
    return '/api/image?f=' + file;
  }
};

Vue.prototype.$PLATFORM = process.platform;
Vue.prototype.$IS_TOUCH = isTouch;
Vue.prototype.$IS_E = Boolean(window.require);
Vue.prototype.$IS_E_NOTIFY = () => {
  if (!Vue.prototype.$IS_E) {
    Notification({
      title: '提示',
      message: '当前非Electron环境',
      duration: 1500,
    });
  }
  return Vue.prototype.$IS_E;
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
