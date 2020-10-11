<template>
    <div>
      <!-- 顶部导航开始 -->
      <mt-header>
          <router-link to="/" slot="left">
              <mt-button icon="back"></mt-button>
          </router-link>
      </mt-header>
      <!-- 顶部导航结束 -->
      <!-- 底部选项卡开始 -->
     <mt-tabbar v-model="selectedTab" fixed>
    <mt-tab-item id="home">
       
        首页
    </mt-tab-item>
    <mt-tab-item id="fx">
      
      发现
    </mt-tab-item>
     <mt-tab-item id="sj">
      市集
    </mt-tab-item>
    <mt-tab-item id="me">
       我
    </mt-tab-item>
    </mt-tabbar> 
      <!-- 底部选项卡结束 -->
    </div>
</template>
<script>
export default {
  data(){
    return {
      //默认的底部选项卡
      selectedTab:'me'
    }
  },
  watch:{
    selectedTab(){
      if(this.selectedTab == 'home'){
      }else if(this.selectedTab == 'fx'){
        this.$router.push('/');
      }
       else if(this.selectedTab == 'sj'){
      } else if(this.selectedTab == 'me'){
         this.$router.push('/me');
      }
    }
  }  
}
</script>