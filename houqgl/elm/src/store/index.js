import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userInfo:null,
      softeem_ele_client_token:null,
      actionSheetConfig:{
        isShow:false
      }
  },
  getters: {
      userInfo(state){
          return state.userInfo;
      },
      actionSheetConfig(state){
        return state.actionSheetConfig;
      }
  },
  mutations: {
      setUserInfo(state,userInfo){
          state.userInfo = userInfo;
      },
      set_softeem_ele_client_token(state,softeem_ele_client_token){
          state.softeem_ele_client_token = softeem_ele_client_token
      },
      logOut(state){
          state.userInfo = null;
          state.softeem_ele_client_token = null;
      },
      setActionSheetConfig(state,config){
            state.actionSheetConfig = config; 
        }
  },
  actions: {
      setUserInfo({commit},userInfo){
          commit("setUserInfo",userInfo)
      },
      set_softeem_ele_client_token({commit},softeem_ele_client_token){
          commit("set_softeem_ele_client_token",softeem_ele_client_token)
      },
      logOut({commit}){
          commit("logOut");
      },
      showActionSheet({commit},config){ 
        config.isShow = true;
        commit("setActionSheetConfig",config);
      },
      hideActionSheet({commit},config){
        config.isShow = false;
        commit("setActionSheetConfig",config);
      }
      
  },
  modules: {
  },
  plugins:[
    persistedstate({
      storage:window.sessionStorage
    })
  ]
})
