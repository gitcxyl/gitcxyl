<template>
    <page-view class="flex-column" id="t">
    <title-bar >信息</title-bar>
  <div class="centent">
    <friendmgs v-for="(item) in fridentList" :key="item.id" :fitem="item"></friendmgs>
  </div>

    </page-view>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import friendmgs from './friendmgs.vue';
import Api from '../utils/Api';
import {mapGetters,mapActions} from "vuex";
export default{
    name:"homepage",
     components:{
       friendmgs
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
            
        //创建方法执行菜品数据的请求
        async query(pageIndex=1){
            this.ishowLoading = true;
          
             
            let results = await Api.fridents.getListByPage({
                pageIndex:pageIndex,
                username:this.userInfo.username
                });
           
            this.pageCount = results.pageCount;
            this.pageEnd = results.pageEnd;
            this.pageStart = results.pageStart; 
            this.totalCount = results.totalCount;
            this.fridentList.push(...results.listData);
            this.pageIndex = results.pageIndex;
           

            console.log(results);
        },



    },


    



   
    
    updated(){
        //  this.Swiper = new Swiper('.swiper-container',{
        //     speed:300,
        //     autoplay:{
        //         delay:2000,
        //         disableOnInteraction: false
        //     },
        //     loop:true,
        //     pagination:{el:'.swiper-pagination'}
        // })
    }
}

</script> 

<style lang="scss" scoped>

 .swiper-slide{
background-color:#f00;
height:2rem;
width:100%;
overflow: hidden;
img{
width:100%;
height:100%;
object-fit: cover;
}
}

    .wrapper{
        height: 100%;
        overflow: hidden;
        @media only screen and (min-width:769px){
            &{
            overflow:auto;
            }

        }

  
        
    }
      #t{
        background-color: #ececec;
    }

    
</style>