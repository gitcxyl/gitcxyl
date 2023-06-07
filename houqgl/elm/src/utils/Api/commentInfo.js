import axiosInstance from "../axiosInstance.js";
const commentInfo = {
    getCommentInfoListByFid({pageIndex,fid}){
        return axiosInstance.get("/commentInfo/getCommentInfoListByFid",{
            params:{
                pageIndex,fid
            }
        })
    }
}

export default commentInfo;