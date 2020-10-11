<template>
  <div>
    <mt-search
  cancel-text="取消"
  placeholder="搜索">
</mt-search>
<!--顶部选项卡-->
   <van-tabs v-if="category.length" class="fixed-tabs" v-model="active" swipeable>
      <van-tab 
        :title="item.category_name"
        v-for="item in  category"
        :key="item.id"
      >
        <!-- 文章列表 -->
        <Conlist :id="item.id" class="content" />
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
<!--底部选项卡-->
 <mt-tabbar v-model="selectedTab" fixed>
    <mt-tab-item id="home">
       <img src="../assets/images/home_disable.svg" slot="icon"  v-if="selectedTab == 'fx'">
      <img src="../assets/images/home_able.svg" slot="icon" v-else>
        首页
    </mt-tab-item>
    <mt-tab-item id="fx">
      <img src="../assets/images/find_able.svg" slot="icon"  v-if="selectedTab == 'fx'">
      <img src="../assets/images/find_disable.svg" slot="icon" v-else>
      发现
    </mt-tab-item>
     <mt-tab-item id="sj">
      <img src="../assets/images/shop_able.svg" slot="icon"  v-if="selectedTab == 'fx'">
      <img src="../assets/images/shop_disable.svg" slot="icon" v-else>
      市集
    </mt-tab-item>
    <mt-tab-item id="me">
      <img src="../assets/images/me_disable.svg" slot="icon"  v-if="selectedTab == 'fx'">
      <img src="../assets/images/me_able.svg" slot="icon" v-else>
       我
    </mt-tab-item>
    </mt-tabbar>    
</div>
</template>
 <style scoped>
 .mint-search{
height: 52px;
 }
.content{
  margin-bottom: 50px;
}
</style>
<script>
import conlist from '../components/list'

export default {
   components: {
    Conlist:conlist
  },

  data() {
    return {
    active: 0,
    selectedTab:'fx',
    //吸顶状态
    
    //存储的分类信息
    category:[],
    //存储特定分类下的文章信息
    };
  },

mounted(){
  //获取文章分类信息
  this.axios.get("/api/category").then((res)=>{
      this.category = res.data.category;
  });
},

watch:{
  //监听底部选项卡的变化
  selectedTab(){
      if(this.selectedTab == 'home'){
      }else if(this.selectedTab == 'fx'){
        this.$router.push('/');
      }
       else if(this.selectedTab == 'sj'){
      } else if(this.selectedTab == 'me'){
         this.$router.push('/me');
      }
  },

}

}
</script>
 

