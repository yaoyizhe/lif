<template>
<div>
    <!--标头-->
  <mt-header :title="obj.username">
    <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button slot="right">目录</mt-button>    
  </mt-header> 
    <div class="head-content">
      <div class="head-left">
        <!--头像-->
        <div class="headimg">
          <img v-lazy="obj.avatar"> 
        </div>
        <!--用户名-->
        <div class="head-title">
          {{obj.username}}
        </div>  
      </div> 
      <div class="head-right">
        <mt-button class="button">关注</mt-button>
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <mt-swipe :auto="4000">
        <mt-swipe-item
        v-for="(item,index) in image"
        :key="index">
         <img v-lazy="item.image">
        </mt-swipe-item>
      </mt-swipe>
      <div class="articleItem-header" v-html="obj.title">
      </div>
      <div class="articleDes" v-html="obj.content">
      </div>
    </div>
    <!--评论区-->
    <div id="comment">
      <comment-content :comment="comment" v-on:change="changCommmer" @parentFn="selComment"></comment-content>
      <comment-textarea ref="comment"  :name="oldComment" v-on:submit="addComment" v-on:canel="canelCommit"></comment-textarea>
    </div>
</div>
</template>
<style scoped>
.head-content{
  display: flex;
  justify-content: space-between;
  height:50px;
  padding:20px 10px 10px 10px;
}
.head-left .headimg{
  float: left;
}
.headimg img{
  width:45px;
  border-radius: 50%;
}
.head-left .head-title{
  float:right;
  line-height: 50px;
  margin-left:5px ;
  font-weight: 600;
}
.head-right .button{
  width: 60px;
  height: 35px;
  border-radius: 10px;
  font-size: 14px;
  background: #b0f1cd;
  color: #fff;
}
.mint-swipe{
  height: 350px;
  overflow: hidden;
}
.mint-swipe img{
  width: 100%;
  height: 100%;
}
.content .articleItem-header,.content .articleDes{
  margin-top: 20px;
  padding-left: 15px;
  text-align: left;
}
.content .articleItem-header{
  font-weight: 600;
  font-size: 14px;
}
.articleDes p{
    padding:5px 0;
    margin-bottom: 10px;
}
</style>
<script>
export default {
  data(){
    return {
        //存储获取到的文章标题、正文及相关的信息
        obj:{},
        image:[],
        
        type: 0,                //0为评论作者1为评论别人的评论
        oldComment: '',       //评论者的名字
       
        chosedIndex: -1,        //被选中的评论的index
        comment:[]
    }
  },
  //在挂载完成后执行的业务代码
  mounted(){
      //请求WEB服务器中以当前地址栏ID为条件的文章标题、正文及相关信息
      var id = this.$route.params.id;
      //发送AJAX请求
      this.axios.get('/api/article?id=' + id).then((res)=>{
        var com=res.data.comment;
        var rep=res.data.replay;
        var replay=[];
        com.forEach((item1) => {
          item1.replay=[];
          rep.forEach((item2)=>{
            if(item1.comment_id==item2.comment_id){
              replay.push(item2);
              item1.replay=replay;
            }
          })
        });

       this.comment=com;
        var data=res.data.image;
        if(data!=null){
          data.forEach((item)=>{
              //进行判断,如果不为空,才进行动态加载图像操作
              item.image = require('../assets/images/article/' + item.image);
              this.image.push(item);
            });
        }
        this.obj = res.data.article;
        this.obj.avatar = require('../assets/images/avatar/' + this.obj.avatar);
      });
  },
   methods: {
        //添加评论
        addComment: function(data) {
    
            if(this.type == 0) {
                this.comment.push({
                    username: this.$store.state.author.username,
                    avatar:this.$store.state.author.avatar,
                    content: data,
                    replay: []
                });       
               
            }else if(this.type == 1){
                this.comment[this.chosedIndex].replay.push({
                    responder: this.$store.state.author.username,
                    res_avatar:this.$store.state.author.avatar,
                    reviewers:this.oldComment,                   
                    content: data
                });
                this.type = 0;
            }
        },
        //监听到了点击了别人的评论
        changCommmer: function(username,index) {
            this.oldComment = username;
            this.chosedIndex = index;
            this.type = 1;
        },
        //监听到了取消评论
        canelCommit: function() {
            this.type = 0;
  
        },
        selComment(){
          this.$refs.comment.selectComent();
        }
    }
}
</script>