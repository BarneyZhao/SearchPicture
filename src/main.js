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
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1,
  error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABc0lEQVRYhe3XsUrEQBQF0FnESguLbcRSLAWx0MY/sFArsbZUG8kHTLFpZsPcex8WLlhapVUbO39A/AYtdF3/YWxcWERlAyGLkAspwrwXDgOB95xr80NijAcAhmaWpn0AnNUGADCMMW5NW29mSdIbgN1aAGaWqtYD2DSzFELYmAnAOedijHskX3u93spMAM45B+Bc0qP3fnEmgJRSB8AlyZuyLOcaAUh67/f72+P3wWAwT/JekjUCALD/22/bCKD277SAFtACWsC/BaSUOpIuUkqdmQBIHptZInncOMB7v/Q1lp1IevPeLzUKkGQkr5xzjuSVJGsMEGNclzTy3nfNLHnvu5JGjQEkPZA8newledoIAMARgKfx+DXuLctyDsATycPKAADDyRHrt2RZtiDppSiKnZ/Oi6LYIfmcZdlCJUCMcW/azUjS9WTv99uTdE0yrwSYJiGENZIfeZ4v/1WX5/mypFEIYbVWgKS7irvjba2AuvIJyiqMJrkwPfIAAAAASUVORK5CYII=',
  loading: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciIHN0eWxlPSJiYWNrZ3JvdW5kOiByZ2IoMjQzLCAyNDMsIDI0Mykgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGNkY2RjIiBzdHJva2Utd2lkdGg9IjIiIHI9IjUiIHN0cm9rZS1kYXNoYXJyYXk9IjIzLjU2MTk0NDkwMTkyMzQ0NyA5Ljg1Mzk4MTYzMzk3NDQ4MyI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L3N2Zz4=',
  attempt: 1,
  adapter: {
    error (listender, Init) {
      console.log('v-lazy img load error with url : ' + listender.src);
    }
  }
});

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
