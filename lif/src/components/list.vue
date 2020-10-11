<template>
   <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
     <div class="content">
      <waterfall :col='2' :data="articles" :gutterWidth="10">
        <div class="articleItem"
        v-for="(article,index) in articles"
        :key="index">
          <div class="articleImg" v-show="article.image!=null">
            <router-link :to="`/article/${article.id}`">
            <img v-lazy="article.image">
            </router-link>
          </div>
          <div class="articleItem-header" v-show="article.title!=null" v-html="article.title">
          </div>
          <div class="articleDes" v-html="article.content" v-show="article.content!=null">
          </div>
          <div class="articlelove">
            <div class="love">
              
            </div>
          </div>
       </div> 
      </waterfall>
    </div>
   </van-list>
</template>
<script>
export default {
	props:['id'],
	 data (){
		 return{
    page:1,
    //存储特定分类下的文章信息
    articles:[],
    //当服务器在处理请求期间,既使再次滚动到滚动范围内不再
    //触发请求函数
    pagecount:'',
    loading: false, // 加载更多 loading
   
    finished: false, // 是否结束
		 }
	 },
	 methods:{
		  //加载更多数据的函数(会被mounted、向下滚动时调用)
    loadData(){
      this.loading = true;
      console.log(1);
      this.axios.get('/api/getArticles?cid=' + this.id + '&page=' + this.page).then((res)=>{
            var data = res.data.articles;
            //将WEB服务器返回的总页数赋值给pagecount变量
            this.pagecount = res.data.pagecount;

            data.forEach((item)=>{
              
              //进行判断,如果不为空,才进行动态加载图像操作
              if(item.image != null){
                  item.image = require('../assets/images/article/' + item.image);
                  item.content='';
              }
          
							this.articles.push(item);
            });
           
            this.loading = false;
        });
      
    },
    //向下滚动时触发的函数
    onLoad(){
        this.page++;
        //如果当前页码小于等于当前分类的总页数时，向
        //WEB服务器发送AJAX请求,以获取更多的数据
        if(this.page <= this.pagecount){
          this.loadData();
          return
        }else{
         this.finished = true}
    }
	 },
	 mounted(){
		this.loadData()
	 }
 }
</script>
<style scoped>
.content{
  padding: 0 4px 0 4px;
}
.articleItem{ 
  max-height: 350px;
  overflow: auto;
  margin:0 5px 13px 5px;
}
.articleItem .articleImg{
   max-height: 300px;
   overflow: hidden;
}
.articleItem .articleImg img{
  width: 100%;
  border-radius:5px;
}
.articleItem .articleItem-header{
  margin: 5px 0 5px 0;
  max-height: 32px;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
.articleItem .articleDes{
  max-height: 300px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: normal;
}
</style>