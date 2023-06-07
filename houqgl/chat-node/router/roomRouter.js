const experss = require("express");
const router = experss.Router();
const serviceFactory = require("../factory/serviceFactory.js");
const ResultJson = require("../model/ResultJson.js");

const ExcelUtils = require("../utils/Excelutils.js");

router.get("/roomList",async (req,resp) =>{

    try{
        let restults = await serviceFactory.roomService.roomList(req.query);
        resp.json(new ResultJson(true,"获取数据成功",restults));
    }
    catch(error){
        resp.json(new ResultJson(false,"获取数据失败"))
    }
})

//软删除路由
router.get("/deleteId",async (req,resp) => {
    try{
    let {id} = req.query;
    let results = await serviceFactory.roomService.deldetestu(id);
    resp.json(new ResultJson(results,results?"修改成功":"修改失败"))
    }catch(error){
    resp.status(500).json(new ResultJson(false,error));
    }
    })

 //exce导出路由
 router.get("/exportExcel", async (req,resp) => {
    let results = await serviceFactory.roomService.exportExcel(req.query);
    let excelPath = ExcelUtils.resultsToExcel(results);
    if(excelPath){
    //后台已经生产好了一个excel文件
    resp.sendFile(excelPath);
    }else{
    resp.json(new ResultJson(false,"excel没有数,不能下载"));
    }


    })
//新增房间
router.get("/addroom",async (req,resp) =>{
    let restults = await serviceFactory.roomService.addroom(req.query);
    resp.json(new ResultJson( restults, restults?"新增成功":"新增失败"))
})


//修改房间
router.get("/stupdate", async (req,resp) => {
  
    let results = await serviceFactory.roomService.update(req.query); 
resp.json(new ResultJson(results, results?"修改成功":"修改失败"))

})
//根据id查询房间

router.get("/findById",async (req,resp) => {
    let {id} = req.query;
   
    let results = await serviceFactory.roomService.findById(id);        
    let flag = results ? true : false;
    resp.json(new ResultJson(flag,flag?"获取数据成功":"数据请求失败",results));
    
})


module.exports = router;