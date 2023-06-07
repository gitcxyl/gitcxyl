//导入axiosInstance
import axiosInstance from "../axiosInstance"
const  sreach = {
    getAllList({telephone}){
        return axiosInstance.get("/frientchatmsg/sreach",{
            params:{
                telephone
            }
        });
    }
}
export default sreach;