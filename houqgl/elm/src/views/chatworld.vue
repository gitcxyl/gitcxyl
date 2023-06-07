<template>
    <page-view class="flex-column" id="nc">
        <title-bar :showBack="true"  @back="$router.back()">{{chatfrom.username}}</title-bar>
        <div class="content-box flex-1">
            <div class="myfriend">
                  <div class=" flex-row a-c" v-if="chatuser.chat!=false&&userInfo.guishu_id==chatfrom.id&&(chatuser.time<chatfrom.time)" >
                <img src="../assets/img/bg1.jpg" alt=""> 
              <span>{{chatuser.chat}}</span>  
                </div>
            </div>
           

             <div class="me flex-row a-c">
                <div class="me-rigth flex-row a-c" v-if="chatfrom.chat!=false">
                <span>{{chatfrom.chat}}</span>
                <img src="../assets/img/bg2.jpg" alt="">
                </div>
                </div>   


                <div class="myfriend">
                  <div class=" flex-row a-c" v-if="chatuser.chat!=false&&userInfo.guishu_id==chatfrom.id&&(chatuser.time>=chatfrom.time)" >
                <img src="../assets/img/bg1.jpg" alt=""> 
              <span>{{chatuser.chat}}</span>  
                </div>
            </div>       
        </div>
        <ul class="tab-bar flex-row j-s-a">
            <li>
                <input type="text" class="txt" v-model="chatmsg">
            </li>
            <li><span @click="query">发送</span></li>
                
           
        </ul>
    </page-view>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>

<script>
import Api from '../utils/Api';
import {mapGetters,mapActions} from "vuex";

export default {
    //这里设置你的组件名，可以不写，如果部写，你的文件名就是你的组件名
    name:"chatworld",
    data(){
        return{
            chatfrom:{
                id:null
            },
            isLoading : true,
            frientmsgList:[],
            chatmsg:{},
            chatuser:{}

        }
    },
     computed:{
      
        ...mapGetters(["userInfo"]),
           newA : function () {
		return JSON.parse(JSON.stringify(this.chatmsg))
	} ,

          newB : function () {
		return JSON.parse(JSON.stringify(this.chatuser))
	} ,
    },

    created(){
        this.chatfrom.id=this.$route.query.id;
         this.getchatDetailById(this.chatfrom.id);
          this.getuserDetailById(this.userInfo.id);
},

beforeUpdate(){
   
    //      setTimeout(() => {
    //     this.chatfrom.id=this.$route.query.id;
    //      this.getchatDetailById(this.chatfrom.id);
    //       this.getuserDetailById(this.userInfo.id);
    // }, 1000);
        
   
    
},

watch:{
    newA : {
		handler : function (newVal, oldVal) {
			if(newVal!=oldVal){
                
                this.getchatDetailById(this.chatfrom.id);
                 this.getuserDetailById(this.userInfo.id);
            }
            
		},
        deep: true,
		immediate : true //初始化页面后立即监听
	} ,

     newB : {
		handler : function (newVal, oldVal) {
			if(newVal!=oldVal){
              
                this.getchatDetailById(this.chatfrom.id);
                 this.getuserDetailById(this.userInfo.id);
            }
            
		},
        deep: true,
		immediate : true //初始化页面后立即监听
	} ,
    },

methods:{

    
   

     async getchatDetailById(id){
        this.isLoading = true;
            let results = await Api.fridents.findById(id);
            this.chatfrom = results;
            this.isLoading = false;
            
        },

       async getuserDetailById(id){
        this.isLoading = true;
            let results = await Api.fridents.findById(id);
            this.chatuser = results;
            this.isLoading = false;
            
        },  


 

     async query(){
              setTimeout(() => {
        this.chatfrom.id=this.$route.query.id;
         this.getchatDetailById(this.chatfrom.id);
          this.getuserDetailById(this.userInfo.id);
    }, 1000);
        
            this.ishowLoading = true;
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var totalSeconds = hours * 3600 + minutes * 60 + seconds;

       let results=  await Api.friendchat.getListByPage({
         chatmsg:this.chatmsg,time:totalSeconds,id:this.$route.query.id
       });  
     

    
}




},
mounted(){
   
}





}
</script>

<style lang="scss" scoped>   
    .tab-bar{
        height:.55rem;
        border-top:solid 1px lightgray;
        background-color:#ffff;
        li{
            font-size:.14rem;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .iconfont{
                font-size:.22rem;
            }

            span{
                width: .5rem;
                height: 50%;
                line-height: .25rem;
                border-radius: .1rem;
                text-align: center;
                color: #ffff;
                background-color: rgb(68, 233, 68);
            }
         

        }
        .txt{
             border:solid .01rem #999;
             border-radius: .2rem;
                    outline:none;
                    height:.4rem;
                    font-size:.16rem;
                    padding-left:.2rem ;
        }

       
    }

    #nc{
        background-color: #f7f5f5;
    }

    .content-box{
.myfriend{
    width: 100%;
    height: 20%;
        span{
             margin-left: .2rem;
             background-color: #fff;
             border-radius: .1rem;
               padding: .07rem;
        }

        img{
            margin-top: .1rem;
             margin-left: .4rem;
             width: 15%;
             height: .5rem;
             border-radius: 10%;
        }
}
.me{
    height: 10%;
position: relative;
     img{
            margin-top: .1rem;
             margin-left: .2rem;
             width: 30%;
             height: .5rem;
             border-radius: 10%;
        }
    span{
        padding: .07rem;
    background-color: #27df0f;
    border-radius: .1rem;
    }
   .me-rigth{
    position: absolute;
    right: 0;
   }
}
    }
</style>








