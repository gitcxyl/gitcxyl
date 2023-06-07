<template>
    <page-view>
         <title-bar :show-back="true">分期办理</title-bar>
         <div class="content-box flex-column a-c">
            <div class="flex-row j-s-a ed">
                <span>分期额度:</span>
                <span>888</span>
            </div>
         </div>
    </page-view>
</template>
<script>
export default {
    name:"integral",
    data(){

    }
}
    

</script>
<style lang="scss" scoped>
.content-box{
    .ed{
        width: 70%;
        border:solid .01rem #000 ;
    }
}
</style>
