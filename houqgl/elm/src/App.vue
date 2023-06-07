<template>
  <div id="app">
    <router-view></router-view>
    <action-sheet v-if="actionSheetConfig.isShow"></action-sheet>
  </div>
</template>

<script>
import actionSheet from "./components/action-sheet.vue"
import {mapGetters} from "vuex"
export default {
  name:"App",
  components:{
    actionSheet
  },
  computed:{
      ...mapGetters(["actionSheetConfig"])
  }
}
</script>

<style lang="scss">
*{
  padding:0;
  margin:0;
}
ul,ol{
  list-style:none;
}
#app{
  width:100vw;
  height:100vh;
  overflow: auto;
  background-color:#fff;
}
:root{
  font-size:calc(100vw / 375 * 100)
}
body{
  font-size:16px;
}
@media only screen and (min-width:769px){
  :root{
    font-size:calc(768px / 375 * 100)
  }
  #app{
    width:768px;
    margin: 0 auto;
   
  }
}
</style>
