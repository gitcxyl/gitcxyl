import axiosInstance  from "../axiosInstance";

const shopCart = {
    addToShopCart({fid,count}){
        return axiosInstance.post("/shopCart/addToShopCart",{
            fid,count
        })
    },
    getMyShopCartTotalInfo(){
        return axiosInstance.get("/shopCart/getMyShopCartTotalInfo")
    },
    getListByPage(pageIndex){
        return axiosInstance.get("/shopCart/getListByPage",{
            params:{
                pageIndex
            }
        })
    },
    deleteMyShopCartFoodById(id){
        return axiosInstance.get("/shopCart/deleteMyShopCartFoodById",{
            params:{
                id
            }
        })
    }
}

export default shopCart;