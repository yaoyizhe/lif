<template>
  <div>
      <!-- 顶部导航开始 -->
      <mt-header>
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <router-link to="/login" slot="right">登录</router-link>
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
            label="用户名" 
            placeholder="请输入用户名" 
            type="text" 
            v-model="username">
          </mt-field>
          <mt-field 
            label="密码" 
            placeholder="请输入密码" 
            type="password"
            v-model="password">
          </mt-field>
          <mt-field label="确认密码" placeholder="请再次输入密码" type="password"></mt-field>
          <button class="button" @click="handler">免费注册</button>
      </div>
      <!-- 表单区域结束 -->
  </div>
</template>
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
<script>
export default {
  data(){
    return {
      phone:'',
      username:'',
      password:''
    }
  },
  methods:{
    checkUsername(){
        //用户名的规范
        var usernameRegExp = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,8}$/;
        //检测用户名
        if(usernameRegExp.test(this.username)){
            return true;
        } else {
            this.$messagebox.alert('用户名为必填项,且长度为1~8的字符');
            return false;
        }
    },
     checkphone(){
        //用户名的规范
        var phoneRegExp = /^[1][3,4,5,7,8,9]\d{9}$/;
        //检测用户名
        if(phoneRegExp.test(this.phone)){
            return true;
        } else {
            this.$messagebox.alert('手机号格式不正确');
            return false;
        }
    },
    handler(){
        if(this.checkUsername() && this.checkphone()){
          //发送AJAX请求到服务器
          var obj = {
              phone:this.phone,
              username:this.username,
              password:this.password
          };
          //QS的stringify()方法用于将数组/对象转换成请求字符串
          this.axios.post('/api/register',this.qs.stringify(obj)).then((res)=>{
              if(res.data.code == 201){
                this.$messagebox.alert('用户名已经存在','注册提示');
              } 
              if(res.data.code == 200){
                this.$messagebox.alert('用户注册成功','注册提示').then(()=>{
                    this.$router.push('/')
                });
              }
          });
        }
      
    }
  }
}
</script>