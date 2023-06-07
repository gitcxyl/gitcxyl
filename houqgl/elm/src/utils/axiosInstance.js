import axios from 'axios';
import Vue from 'vue';
import store from '../store';
import router from '../router'

//创建一个axios对象进行配置
const axiosInstance = axios.create({
    //响应超时现时5秒
    timeout:5000,
    //请求部署地址，后期在请求的是就不需要再处输入服务器地址了
    baseURL:"http://localhost:8080",
    
})

//其中config就是每次发送请求之前可以设置的一些配置写在这个里面，其中就有一个headers请求头的设置
axiosInstance.interceptors.request.use(config => {
    if(store.state.softeem_ele_client_token){
        config.headers["softeem_ele_client_token"] = store.state.softeem_ele_client_token;
    }    
    return config
})

//调用axios对象中的响应拦截器，每次数据响应的时候拦截一下处理
axiosInstance.interceptors.response.use(
    resp => {
        Vue.prototype.$msg.closeAll();
        /**
         * resp.data = {
                    status:"success",
                    msg:"接口返回的消息",
                    data:[]
                }
         * 
         * 
         */
        //判断一下是否真的成功
   
        if(resp.data.status=="success"){
            // Vue.prototype.$msg.success(resp.data.msg);
            return Promise.resolve(resp.data.data);
        }else{
            console.log("服务器进入成功，但是数据调用失败",resp.data,resp.data.msg);
            Vue.prototype.$msg.error(resp.data.msg);
            return Promise.reject(resp.data);
        }
    },
    //请求失败之后执行的事情
    error => {
        if(error.response.status == 403){
            Vue.prototype.$msg.error("你还没有登录，请登录");
            router.push({name:'login'})
        }else{
            Vue.prototype.$msg.error("加载失败");
        }       
        return Promise.reject(error);
    }
)

export default axiosInstance;
