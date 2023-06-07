<template>
    <page-view class="flex-column" id="e">
        <title-bar :showBack="false">通讯录</title-bar>
       
        <div class="content-box">
            <chat-list v-for="(item) in fridentList" :key="item.id" :fitem="item"></chat-list>
        
    </div>
    </page-view>
</template>

<script>
import chatList from '../components/chat-list.vue';

import {mapGetters,mapActions} from "vuex";
import Api from '../utils/Api'
export default {
    name:"depositmoney",
     components:{
        chatList
     },

      computed:{
        //将vuex的数据导出
        ...mapGetters(["userInfo"])
    },
     data(){
         return {
        pageIndex:1,
        pageCount:0,
        pageEnd:1,
        pageStart:1,
        totalCount:0,
        fridentList:[],
        scroll:null,
        ishowLoading:false,
       bannerImgList:[],
       baseURL:"http://localhost:8080",
       
       
        }
     },
 created(){
   
        this.query();
    },

    
 methods:{
             ...mapActions(["setUserInfo","set_softeem_ele_client_token"]),
        //创建方法执行菜品数据的请求
        async query(pageIndex=1){
            this.ishowLoading = true;
          
             
            let results = await Api.fridents.getListByPage({
                pageIndex:pageIndex,
                username:this.userInfo.username
                });
            this.set_softeem_ele_client_token(results.token);
            this.pageCount = results.pageCount;
            this.pageEnd = results.pageEnd;
            this.pageStart = results.pageStart; 
            this.totalCount = results.totalCount;
            this.fridentList.push(...results.listData);
            this.pageIndex = results.pageIndex;
           

           
        },



    }
}
</script>
<style lang="scss" scoped>
    .login-box{
        border:solid 1px #ececec;
        width:3rem;
        margin:.5rem auto;
        padding:.1rem;
        .login-item{
            padding:.1rem;
            border-bottom:solid 1px #ececec;
            .left{
                width:.5rem;
                .iconfont{
                    font-size:.22rem;
                }
            }
            .right{
                .txt{
                    border:none;
                    outline:none;
                    height:.4rem;
                    font-size:.16rem;
                }
            }
        }
        .btn-login{
            border:none;
            height:.4rem;
            width:100%;
            color:#fff;
            font-size:.18rem;
            border-radius:.06rem;
        }
    }

    #e{
        background-color: #ececec;
    }

</style>