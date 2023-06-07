//导入axiosInstance
import axiosInstance from "../axiosInstance"

const friendchat = {
   

    getListByPage({chatmsg,time,id}){
        return axiosInstance.post("/frientchatmsg/msgadd",{
            chatmsg,time,id  
        })
    },

}

export default friendchat;