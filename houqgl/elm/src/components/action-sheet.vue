<template>
    <div class="action-sheet">
        <ul class="menu-list">
            <li @click="itemClick(index)" v-for="(item,index) in actionSheetConfig.menuList" :key="index" :id="index">{{ item }}</li>
            <li @click="hideActionSheet({})">取消</li>
        </ul>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
export default {
    name:"action-sheet",
    methods:{
        ...mapActions(["hideActionSheet"]),
        itemClick(index){
            if(this.actionSheetConfig.callBack && typeof this.actionSheetConfig.callBack == "function"){
                this.actionSheetConfig.callBack(index);
             
                this.hideActionSheet({})
            }
        }
    },
    computed:{
        ...mapGetters(["actionSheetConfig"])
    }
}
</script>

<style lang="scss" scoped> 
.action-sheet{
    position: fixed;
    left:0;
    top:0;;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.8);
    z-index:9999;
    .menu-list{
        position: absolute;
        width: 100%;
        bottom:0;
        left:0;
        padding:.1rem;
        box-sizing: border-box;
        >li{
            background:#fff;
            height:.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size:.14rem;
            margin-bottom:.05rem;
            border-radius:.06rem;
            &:last-child{
                margin-top:.1rem;
            }
        }
    }
}
</style>