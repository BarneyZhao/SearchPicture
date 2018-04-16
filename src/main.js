// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css';

import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Input,
  Button,
  Form,
  FormItem,
  Icon,
  Col,
  Row,
  Message,
  MessageBox,
  Notification,
} from 'element-ui';

import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);

window.Message = Message;
window.MessageBox = MessageBox;
window.Notification = Notification;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
