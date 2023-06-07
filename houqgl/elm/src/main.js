import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'

Vue.config.productionTip = false

//导入icon图标
import './assets/icon/iconfont.css'
import './assets/scss/comm.scss'





//注册全局组件
import pageView from './components/page-view.vue';
Vue.component("page-view",pageView);

import titleBar from './components/title-bar.vue';
Vue.component("title-bar",titleBar);

import vuerify from 'vuerify';
Vue.use(vuerify);
import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'
Vue.use(Message,{name:'msg'})


import { mapActions,mapGetters } from 'vuex'
Vue.mixin({
 
  computed:{
    ...mapGetters(["actionSheetConfig"])
  },
  methods:{
      ...mapActions(["showActionSheet","hideActionSheet"])
  }
}) 
// router.beforeEach((to,from,next) => {
//   if(to.meta.requireAuth == true){
//     if(store.state.softeem_ele_client_token){
//       next();
//     }
//     else{
//       next({name:"login"})
//     }
//   }
//   else{
//     next()
//   }
// })



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
