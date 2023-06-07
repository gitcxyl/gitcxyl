<template>
    <page-view class="flex-column">
        <title-bar :show-back="true" @back="$router.back()">登录</title-bar>
        <div class="content-box flex-1">
            <div class="login-box">
                <div class="login-item flex-row">
                    <div class="left flex-row j-c a-c">
                        <span class="iconfont iconyonghuming"></span>
                    </div>
                    <div class="right">
                        <input type="text" placeholder="请输入用户名" class="txt" v-model="loginForm.username" >
                       
                        <div v-if="errors['loginForm.username']">{{ errors["loginForm.username"] }}</div>
                    </div>
                </div>
                <div class="login-item flex-row">
                    <div class="left flex-row j-c a-c">
                        <span class="iconfont iconmima"></span>
                    </div>
                    <div class="right">
                        <input type="password" placeholder="请输入密码" class="txt" v-model="loginForm.password" >
                      
                        <div v-if="errors['loginForm.password']">{{ errors["loginForm.password"] }}</div>
                    </div>
                </div>
                <div class="login-item flex-row a-c j-s-b">
                    <label>
                        <input type="checkbox" style="margin-right:.05rem" >记住密码
                    </label>
                    <a class="register-link" @click="$router.push({name:'register'})" >我要注册</a>
                </div>
                <button type="button" class="btn-login bg-primary" @click="checkLogin">登录</button>
            </div>
        </div>
    </page-view>
</template>

<script>
import Api from '../utils/Api'
import {mapActions} from 'vuex'
export default {
    name:'login',
    data(){
        return {
            loginForm:{
                username:"",
                password:""
            }

        }
    },
    vuerify:{
        "loginForm.username":{
            test:/.+/,
            message:"账号不能为空"
        },
        "loginForm.password":{
            test:/.+/, 
            message:"密码不能为空"
        }
    },
    methods:{
        ...mapActions(["setUserInfo","set_softeem_ele_client_token"]),
       async checkLogin(){
            if(this.$vuerify.check()){
                
                let results = await Api.userInfo.checkLogin(this.loginForm);
               console.log(results)
                this.setUserInfo(results);
                this.set_softeem_ele_client_token(results.token);
              
                this.$router.back({
                    name:'my'
                })
            }
        }
    },
    computed:{
        errors(){
            return this.$vuerify.$errors;
        }
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

            .register-link{
                color: rgb(25, 92, 238);
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
</style>