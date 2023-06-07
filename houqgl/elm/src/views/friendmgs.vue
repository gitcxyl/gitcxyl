<template>
   <div class="chatlist flex-row a-c" @click="toFridentdate" v-if="fitem.chat&&fitem.guishu_id==userInfo.id">
   
    <img src="../assets/img/bg1.jpg" alt="">
   <div class="username flex-column j-s-b">
    <span>{{fitem.username}}</span>
    <span class="txt1">{{fitem.chat}}</span>
    
    </div>
   </div>
</template>


<script>


import {mapGetters,mapActions} from "vuex";
export default {

    name:"friendmgs",
     props:["fitem"],
      computed:{
        //将vuex的数据导出
        ...mapGetters(["userInfo"])
    },


    methods:{
      toFridentdate(){
          this.$router.push({
                name:'chatworld',
                query:{
                    id:this.fitem.id,
                   
                }
                
            })
        }
      }
    }

</script>
<style scoped lang="scss">

    .chatlist{
        margin-top:.2rem;
        width: 100%;
        height: .7rem;
        background-color: #fffffffd;
          
           img{
            margin-left: .2rem;
             width: 15%;
             height: 70%;
             border-radius: 10%;
           }
           .username{

            margin-left: .2rem;
            .txt1{
                font-size: .02rem;
                color: #999;
            }
           }
        
    }
</style>