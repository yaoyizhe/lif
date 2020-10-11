<template>
  <div>
      <!-- 顶部导航开始 -->
      <mt-header>
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <router-link to="/regist" slot="right">注册</router-link>
      </mt-header>
      <!-- 顶部导航结束 -->
      <!-- 表单区域开始 -->
      <div>
          <mt-field 
            label="手机号" 
            placeholder="请输入手机号" 
            type="text" 
            v-model="phone">
          </mt-field>
          <mt-field 
            label="密码" 
            placeholder="请输入密码" 
            type="password"
            v-model="password">
          </mt-field>
          <button class="button" @click="handler">快速登录</button>
      </div>
      <!-- 表单区域结束 -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      phone:'',
      password:''
    }
  },
  methods: {
    handler(){
        //检测用户名和密码的规范
        var obj = {
            phone:this.phone,
            password:this.password
        };
        this.axios.post('/api/login',this.qs.stringify(obj)).then((res)=>{
            if(res.data.code == 202){
              this.$messagebox.alert('手机号或密码错误','登录提示');
            }
            if(res.data.code == 200){
              //登录成功,将相关信息存储到sessionStorage中
              sessionStorage.setItem('id',res.data.info.id);
              sessionStorage.setItem('username',res.data.info.username);
              sessionStorage.setItem('avatar',res.data.info.avatar);
              sessionStorage.setItem('phone',res.data.info.phone);
              sessionStorage.setItem('isLogined',true);      
              //将数据存储到Vuex中        
              this.$store.commit('userLogined',res.data.info); 
              //根据地址栏中是否存在redirect的参数来决定跳转到哪个路由
              //console.log(this.$route);
              if(this.$route.query.redirect){
                this.$router.push(this.$route.query.redirect);
              } else {
                this.$router.push('/');
              }
            }
        });
    }
  }
}
</script>
<style scoped>
.button{
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  color: #8590a6;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: #0084ff;
  border: 1px solid;
  border-radius: 3px;
  width: 100%;
  margin-top: 10px;
  height: 36px;
}
</style>