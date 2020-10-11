import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     //存储登录作者的相关信息
     author:{
      id:sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '',
      phone:sessionStorage.getItem('phone') ? sessionStorage.getItem('phone') : '',
      avatar:sessionStorage.getItem('avatar') ? sessionStorage.getItem('avatar') : '',
      username:sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '',
      //标识作者是否登录
      isLogined:sessionStorage.getItem('isLogined') ?  sessionStorage.getItem('isLogined') : false
    }
  },
  mutations: {
     //用户登录成功后,修改在Vuex中共享的用户信息
     userLogined(state,payload){
      state.author.id = payload.id;
      state.author.phone = payload.phone;
      state.author.avatar = payload.avatar;
      state.author.username = payload.username;
      state.author.isLogined = true;
      //根据上述的代码可以发现，在组件文件中
      //如果要调用userLogined()方法的时候,payload参数必须
      //为对象形态
   }
  },
  actions: {
  },
  modules: {
  }
})
