<template>
    <page-view class="flex-column my-page">
        <title-bar >我的</title-bar>
        <div class="content-box flex-1">
            <div class="flex-row menu-item">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont iconcrown-fill" style="color:#ffd804"></span>
                </div>
                <div class="center flex-1 flex-row a-c">
                    <div class="userimg">
                        <img src="../assets/img/bg1.jpg" alt="">
                        <div class="userId">
                         {{userInfo?`欢迎登录：${userInfo.username}`:'暂未登录'}}
                         </div>
                    </div>
                   
                </div>
                <div class="right" @click="$router.push({name:'login'})" v-if="!userInfo">去登录</div>
            </div>

             

            <div class="flex-row menu-item" style="margin-top:.1rem">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont icongouwucheman" style="color:#008de1"></span>
                </div>
               
                <div class="center flex-1 flex-row a-c" @click="$router.push({name:'shopCartList'})">
                    朋友圈
                </div>
                <div class="right">
                    <span class="iconfont iconyoujiantou1"></span>
                </div>
            </div>
            <div class="flex-row menu-item">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont icondropbox" style="color:#5acc86"></span>
                </div>
                <div class="center flex-1 flex-row a-c" @click="$router.push({name:'car'})">
                    设置
                </div>
                <div class="right">
                    <span class="iconfont iconyoujiantou1"></span>
                </div>
            </div>
            <div class="flex-row menu-item">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont iconlayout-fill" style="color:#6c76eb"></span>
                </div>
                <div class="center flex-1 flex-row a-c" @click="confirmLogOut">
                    退出登录
                </div>
                <div class="right">
                    <span class="iconfont iconyoujiantou1"></span>
                </div>
            </div>
        </div>
    </page-view>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
export default {
    name:"my",
    computed:{
        //将vuex的数据导出
        ...mapGetters(["userInfo"])
    },
    methods:{
        ...mapActions(["logOut"]),
        confirmLogOut(){
            if(confirm("你确定退出么?")){
                this.logOut();
            }
        }
    }

}
</script>



<style lang="scss" scoped>
.my-page{
    background-color:#f7f7f7;
    .menu-item{
        background-color:#fff;
        height:.5rem;
        div{
            height:100%;
            font-size:.14rem;            
        }
        .left{
            width:.4rem;
            .iconfont{
                font-size:.22rem;
            }
        }
        .center{

            border-bottom:1px solid #ececec;
           
            .userimg{
                width: 70%;
               
                position: relative;
                img{
                    width: .5rem;
                    height: .5rem;
                    border-radius: 50%;
                }
                .userId{
                    position: absolute;
                    top:0;
                    left: .6rem;
                }
            }
        }
        .right{
            display:flex;
            align-items: center;
            justify-content: flex-end;
            width:.7rem;
            padding-right:.1rem;
            border-bottom:1px solid #ececec;
        }
    }
}



</style>