import Vue from 'vue';
import Vuelidate from 'vuelidate';
import {
 MdButton, MdField, MdCard, MdContent, MdTabs, MdSnackbar, MdProgress,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdField);
Vue.use(MdCard);
Vue.use(MdSnackbar);
Vue.use(MdProgress);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
