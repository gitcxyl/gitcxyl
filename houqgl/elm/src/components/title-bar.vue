<template>
    <div class="title-bar-box bg-primary">
        <div class="left-back" v-if="showBack" @click="$emit('back',$event)">
            <span class="iconfont iconfanhui"></span>
            返回
        </div>
       
        <slot></slot>
        <div class="right-menu"  v-if="!showBack">
            <div name="right-menu" @click="$router.push({name:'sreach'})">搜索</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"title-bar",
    props:{
        showBack:{
            type:Boolean,
            default:() => false
        }
    }
}
</script>

<style lang="scss" scoped>
    .title-bar-box{
        font-size:.18rem;
        color:#fff;
        height:.45rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .left-back{
            position: absolute;
            left:.14rem;
            display: flex;
            align-items: center;
            font-size:.14rem;
        }
        .right-menu{
            position: absolute;
            right:.1rem;
             font-size:.14rem;
        }
    }
</style>