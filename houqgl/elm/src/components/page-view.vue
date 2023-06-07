<template>
    <div class="page-view-box">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"page-view"
}
</script>

<!-- 如果style添加一个scoped，代表当前style里面写的样式是一个封闭样式，只能在当前组件内使用 -->
<style scoped lang="scss">
   .page-view-box{
        width:100%;
        height:100%;
        overflow: auto;
        box-sizing: border-box;
        background-color: #fff;
   } 
</style>