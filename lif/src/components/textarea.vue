<template>
  <div>
		<div class="commentBox">
				<div class="comment">
        <input :disabled="this.$store.state.author.isLogined == false" :placeholder="Comment" v-model="commentText">
        <button class="btn" @click="addComment">发表</button>
        <button class="btn" @click="canelComment">取消</button>
				</div>
    </div>
  </div> 
</template>
<script>
export default {
    props: ['name'],
    data (){
        return {commentText:"",
            Comment:""}
    },
    methods: {
        addComment(){
          if(this.$store.state.author.isLogined == false){
            return
          }else if(this.commentText!==""){
            this.$emit("submit",this.commentText);
            this.commentText = "";
          }
        },
        canelComment() {
           if(this.$store.state.author.isLogined == true){
            this.$emit("canel");
            this.commentText = "";
            this.Comment="发表评论...";
           }
        },
        selectComent(){
          if(this.$store.state.author.isLogined == false){
         this.Comment="请登陆后再评论";
         return
         }else{
        this.Comment="发表评论...";
         }
        }
    },
    mounted(){
      this.selectComent();

    },
    watch:{
      name(n,o){
       this.Comment="回复"+n;
      }
    }
}
</script>
<style lang="stylus" scoped>
.comment{
  position:fixed;
	right 0;
	left:0;
	bottom:0;
	z-index: 1;
	height 30px;
  background :#fff;
}
.commentBox input{
	width:60%;
	margin-right :10px;
}
</style>