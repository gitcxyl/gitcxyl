import axiosInstance from "../axiosInstance";

const userInfo = {
    checkLogin({username,password}){
        return axiosInstance.post("/login/checkLogin",{
            username,password
           
        }) 
    }
}

export default userInfo