import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import homepage from '../views/homepage.vue';
import integral from '../views/integral.vue';
import depositmoney from'../views/depositmoney.vue';
import my from'../views/my.vue';
import fridentdate from'../views/fridentdate.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import friendmgs from '../views/friendmgs.vue';
import chatworld from '../views/chatworld.vue';
import sreach from '../views/sreach.vue'

Vue.use(VueRouter);
const router = new VueRouter({
  mode:"hash",
  routes:[
    {
      path:"/",
      redirect:{
        name:"homepage"
      }

    },
    {
      path:"/home",
      name:"home",
      component:home,
      children:[
      {
        path:"/homepage",
        name:"homepage",
        component:homepage,
        children:[
          {
            path:"/friendmgs",
            name:"friendmgs",
            component:friendmgs,
          }
        ]
      },
      
      {
        path:"/depositmoney",
        name:"depositmoney",
        component:depositmoney,
        meta:{
          //我们可以自定义一个键值对，这个键和值可以随便取
          requireAuth:true,
         
      }
      },
      {
        path:"/my",
        name:"my",
        component:my,
      }
    ]

    
    },
    {
      path:"/integral",
      name:"integral",
      component:integral,
    },
{
  path:"/fridentdate",
  name:"fridentdate",
  component:fridentdate,
},
{
  path:"/login",
  name:"login",
  component:login,
  meta:{
    //我们可以自定义一个键值对，这个键和值可以随便取
    requireAuth:true,
   
}
},
{
  path:"/register",
  name:"register",
  component:register,
},
{
  path:"/chatworld",
  name:"chatworld",
  component:chatworld
},
{
  path:"/sreach",
  name:"sreach",
  component:sreach,
}

  ]
})

export default router
