<template>
    <page-view id="h">
         <title-bar :show-back="true" @back="$router.back()">好友</title-bar>
<div class="carList flex-column a-c">
         <div class="myfrident">
            <div class="frident flex-row a-c">
            <img src="../assets/img/bg1.jpg" alt="">
            <span class="friendname">{{fridentDate.username}}</span>
                </div>
                <div class="friendq">
                    <div class="friend-q"><span>朋友圈</span></div>
                    <div class="friendqimg"><img src="../assets/img/bg3.jpg" alt=""></div>
                    </div>
                <div class="friendmgs" v-if="fridentDate.fridents_id==userInfo.username">
                    <div @click="tochatword" >发信息</div>
                </div>

                <div class="friendmgs" v-if="fridentDate.fridents_id!=userInfo.username">
                    <div @click="add_frient">添加好友</div>
                </div>
              

         </div>

         
         </div>
    </page-view>
</template>
<script>
import Api from '../utils/Api'
import {mapGetters} from "vuex";
export default {
    
    name:"fridentdate",
    data(){
         return {
           fridentDate:{
                id:null
            },
            //用于v-if显示隐藏页面使用
            isLoading:true,
            add:""
           
        }
    },
 computed:{
        //将vuex的数据导出
        ...mapGetters(["userInfo"]),
    },
    
 
created(){
     this.fridentDate.id = this.$route.query.id;
    this.getfridentDateById(this.fridentDate.id);
},
methods:{


async addfrient(){

    let results  = await Api.fridents.addfrients({
        fridents_id:this.userInfo.username,id:this.$route.query.id,fridents_i:this.fridentDate.fridents_id
    })
},

 add_frient(){
        setTimeout(() => {
           this.addfrient() 
           this.fridentDate.id = this.$route.query.id;
            this.getfridentDateById(this.fridentDate.id);
        }, 1000);
        
    },

    async query(){
        let results = await Api.fridents.getListByPage({
                pageIndex:pageIndex,
                username:this.userInfo.username
                });
                
                this.add=results
    },



       tochatword(){
        this.$router.push({
            name:"chatworld",
            query:{
                id:this.$route.query.id
            }
        })
       },
        async getfridentDateById(id){
            this.isLoading = true;
            let results = await Api.fridents.findById(id);
            this.fridentDate = results;
            console.log(results)
            this.isLoading = false;
        },
       
    }
}
</script>
<style lang="scss" scoped>
.myfrident{
     background-color: #FFFF;
     width: 100%;
     height: 4rem;
     .frident{
       
      height: 40%;
        border-bottom: solid .01rem #ececec;
        img{
            margin-left: .4rem;
             width: 20%;
             height: .7rem;
             border-radius: 10%;
        }
        .friendname{
            margin-left: .2rem;
        }
     }
     .friendq{
        width: 100%;
        height: .7rem;
        border-bottom: solid .01rem #ececec;
        .friend-q{  
            width: 50%;
           
          
           
           
            }
            .friendqimg{
                img{
                   margin-left: .5rem;
             width: 15%;
             height: 60%;
             border-radius: 10%; 
                }
            }
     }

     .friendmgs{
         height: .5rem;
         text-align: center;
         line-height: .5rem;
         border-bottom: solid .01rem #ececec;
     }
}
 #h{
        background-color: #ececec;
    }
</style>