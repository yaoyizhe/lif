<template>
  <div>
 		<div class="commentBox">
        <h3>热门评论</h3>
        <p v-if="comment.length===0">暂无评论，我来发表第一篇评论！</p>
        <div v-else>
            <div class="comment" v-for="(item,index) in comment" :key="index" >
                <span class="image"><img :src="require('../assets/images/avatar/'+item.avatar)"></span><b>{{item.username}}<span>{{item.time}}</span></b>
                <p @click="changeCommenter(item.username,index),submint()">{{item.content}}</p>
                <div>
                    <div class="reply" v-for="(replay,index) in item.replay" :key="index">
                        <b><span class="image"><img :src="require('../assets/images/avatar/'+replay.res_avatar)"></span>{{replay.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{replay.reviewers}}<span>{{replay.time}}</span></b>
                        <p @click="changeCommenter(replay.responder,index),submint()">{{replay.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>  
</template>
<script>
export default {
  props: ['comment'],
  
   methods: {
       changeCommenter: function(username,index) {
           this.$emit("change",username,index);
       },
       submint(){
           this.$emit('parentFn');
       }
   },
 mounted(){

   
 }

}
</script>
<style lang="stylus" scoped>
.commentBox{
text-align :left;
padding-left:15px;
margin:10px 0 30px 0;
}
.commentBox h3{
	border-top:10px solid #f6f6f6;
	padding-top:10px;
	margin 15px 0 20px 0;
}
.comment{
	border-bottom:2px solid #f6f6f6;
}
.comment p{
	margin :10px 0 10px 0;
	padding-left :15px;
	font-size:16px;
	font-weight:600; 
}
.reply{
	padding-left:13px;
}
.image{line-height:17px;
    margin:0 5px 0 5px;}
.image img{
    width 17px;
    height:17px;
    border-radius:50%;
}
</style>