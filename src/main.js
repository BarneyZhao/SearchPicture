import 'normalize.css';
import '@/main.css';

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
  Select,
  Option,
  Message,
  MessageBox,
  Notification,
  Upload,
} from 'element-ui';

import Vue from 'vue';
import App from './App.vue';
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
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);

window.Message = Message;
window.MessageBox = MessageBox;
window.Notification = Notification;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
