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
  Upload,
  Radio,
  Message,
  MessageBox,
  Notification,
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
Vue.use(Radio);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$notify = Notification;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
