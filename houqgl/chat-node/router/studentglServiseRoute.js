const { query } = require("express");
const experss = require("express");
const router = experss.Router();
const serviceFactory = require("../factory/serviceFactory.js");
const ResultJson = require("../model/ResultJson.js");
const ExcelUtils = require("../utils/Excelutils.js");
const path = require("path")


const jwt = require("jsonwebtoken");
const AppConfig = require("../config/AppConfig.js");


router.get("/findById",async (req,resp) => {
    let {id} = req.query;
   
    let results = await serviceFactory.studentglService.findById(id);        
    let flag = results ? true : false;
    resp.json(new ResultJson(flag,flag?"获取数据成功":"数据请求失败",results));
    
})

//学生管理路由
router.get("/stuglInfoList", async (req,resp) => {

    try{
    let restults = await serviceFactory.studentglService.getAllList(req.query);
   resp.json(new ResultJson(true,"数据获取成功",restults));
    }
    catch(error){
        resp.json(new ResultJson(false,"数据获失败",error));
    }
})

router.get("/school",async (req,resp) =>{
    try{
      
        let restults = await serviceFactory.studentglService.seekList(req.query);
        resp.json(new ResultJson(true,"获取数据成功",restults));
    }
    catch(error){
        resp.json(new ResultJson(false,"获取数据失败"))
    }
})


router.get("/roomList",async (req,resp) =>{ 
        let restults = await serviceFactory.studentglService.roomList(req.query);
        let flag = restults ?true:false;
        resp.json(new ResultJson(flag, flag?"获取成功":"获取失败",restults))
})
////学生所属教师列表
router.get("/teacherList",async (req,resp) =>{

        let restults = await serviceFactory.studentglService.teacherList();
        let flag = restults ?true:false;
        resp.json(new ResultJson(flag, flag?"获取成功":"获取失败",restults))
    

})


//学生户籍addressList
router.get("/addressList",async (req,resp) =>{
   
        let restults = await serviceFactory.studentglService.addressList(req.query);
        let flag = restults ?true:false;
        resp.json(new ResultJson(flag, flag?"获取成功":"获取失败",restults))
    
   
})  


//新增学生路由
router.get("/addstudent",async (req,resp) =>{
   
        let restults = await serviceFactory.studentglService.addStudent(req.query);
        resp.json(new ResultJson( restults, restults?"新增成功":"新增失败"))
})

//软删除路由
router.get("/deleteId",async (req,resp) => {
    let {id} = req.query;
    let results = await serviceFactory.studentglService.deldetestu(id);
    resp.json(new ResultJson(results,results?"删除成功":"删除失败"))
    })

    //exce导出路由
    router.get("/exportExcel", async (req,resp) => {
        let results = await serviceFactory.studentglService.exportExcel(req.query);
       
        let excelPath = ExcelUtils.resultsToExcel(results);
        if(excelPath){
        //后台已经生产好了一个excel文件
        
        resp.sendFile(excelPath);
        }else{
        resp.json(new ResultJson(false,"excel没有数,不能下载"));
        }
    
    
        })


        router.post("/checkLogin",async (req,resp) => {

            let results = await serviceFactory.studentglService.checkLogin(req.body);
            if(results){
                //登录成功，发放token
                let tok = jwt.sign({
                adminInfo:results
                },AppConfig.jwtKey,{
        
                    expiresIn: 60 * 30
        })
        resp.json(new ResultJson(true,"登录成功",tok));//将令牌返回给前端
       
        }else{
        resp.json(new ResultJson(false,"登录失败"));
        }
            })
        
        

module.exports = router; 