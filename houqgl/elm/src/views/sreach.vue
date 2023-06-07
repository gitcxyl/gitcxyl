<template>
   <page-view id="sh">
    <title-bar :showBack="true" @back="$router.back()">搜索</title-bar>
        <div class="sreach flex-row">
           <input type="text"  class="txt" v-model="telephone"> 
           <div class="btn" @click=" sreach">搜索</div>
        </div>

        <div class="retulse">
            <span>搜索结果</span>

    <div class="chatlist flex-row a-c" v-if="sreachList" @click="toFridentdate">
    <img src="../assets/img/bg1.jpg" alt="">
   <div class="username" >{{sreachList.username}}</div>
   </div>
        </div>
        
    
   </page-view>
</template>
<script>

import Api from '../utils/Api'
export default {

    name:"sreach",
    data(){
        return{
        telephone:"",
        sreachList:null
        }
    },


    methods:{


          toFridentdate(){
          this.$router.push({
                name:'fridentdate',
                query:{
                    id: this.sreachList.id,
                   
                }
                
            })
        },

        async sreach(){
            let results = await Api.sreach.getAllList({
                telephone:this.telephone
            });
            this.sreachList=results;
            console.log(results)
        }

    }


}
</script>

<style lang="scss" scoped>
    #sh{
       background-color: #ececec; 
       .sreach{
        margin: 0 auto;
        border:solid .01rem #999;
             border-radius: .2rem;
                    outline:none;
                    height:.4rem;
                    font-size:.16rem;
                     background-color: #fff;
                     margin-top:.3rem ;
                     width: 60%;
       .btn{
     
                width: .5rem;
                height: 99%;
                line-height: .25rem;
                border-top-right-radius: .2rem;
                border-bottom-right-radius: .2rem;
                text-align: center;
                color: #ffff;
                background-color: rgb(238, 223, 17);
                line-height:.4rem;
            }
       .txt{
                 border: none;
                 width: 70%;
                    outline:none;
                    height:.4rem;
                    font-size:.16rem;
                    margin-left:.3rem ;
                    border-top-left-radius: .2rem;
                    border-bottom-left-radius: .2rem;
        }
       }
    }

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
           }
        
    }
</style>