const experss = require("express");
const router = experss.Router();
const serviceFactory = require("../factory/serviceFactory.js");
const ResultJson = require("../model/ResultJson.js");
const jwt = require("jsonwebtoken");
const AppConfig = require("../config/AppConfig.js");


router.post("/checkLogin",async (req,resp) => {

    let results = await serviceFactory.loginService.checkLogin(req.body);
    if(results){
        // //登录成功，发放token
        // let token = jwt.sign({
        // adminInfo:results
        // },AppConfig.jwtKey,{

        //     expiresIn: 60 * 30
// })
resp.json(new ResultJson(true,"登录成功",results));//将令牌返回给前端
}else{
resp.json(new ResultJson(false,"登录失败"));
}


router.get("/getListByPage",async (req,resp) =>{

    let restults = await serviceFactory.loginService.getListByPage(req.query);
    let flag = restults ?true:false;
    resp.json(new ResultJson(flag, flag?"获取成功":"获取失败",restults))


})


    })


    router.get("/findById",async (req,resp) => {
        console.log(req.query)
        let {id} = req.query;
       
        let results = await serviceFactory.loginService.findById(id);        
        let flag = results ? true : false;
        resp.json(new ResultJson(flag,flag?"获取数据成功":"数据请求失败",results));
        
    })


   

    module.exports = router;