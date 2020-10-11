import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import Index from '../views/Index'
import Article from '../views/article'
import Regist from '../views/regist'
import Login from '../views/login'
import Me from '../views/me'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path:'/article/:id',
    component:Article
  },
  {
    path:'/me',
    component:Me,
    meta:{
      //requiresAuth是自定义的头部参数名称,
      //标识访问该路由时是否进行用户登录的检测
      requiresAuth:true
    }
  },
  {
    path:'/regist',
    component:Regist
  },
  {
    path:'/login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  //检测目标路由信息是否包含requiresAuth的元信息
  //如果包含则代表需要进行用户登录状态的检测
  if(to.meta.requiresAuth){
    //检测用户是否登录了?
    if(store.state.author.isLogined == false || sessionStorage.getItem('isLogined') == false){
      //强行跳转到登录路由(附加目标路由信息作为URL地址栏的参数)
      //该参数将在用户登录成功后，再次跳转回该路由
      router.push('/login?redirect=' + to.fullPath);
    } else {
      //访问用户期望访问的信息(如我的,也就是说访问那些用户已登录后才能访问的路由)
      next();
    }

  } else {
    //不需要用户登录即可访问的路由
    next();
  } 
});

export default router
