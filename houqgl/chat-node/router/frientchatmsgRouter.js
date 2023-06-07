const { query } = require("express");
const experss = require("express");
const router = experss.Router();
const serviceFactory = require("../factory/serviceFactory.js");
const ResultJson = require("../model/ResultJson.js");
const ExcelUtils = require("../utils/Excelutils.js");
const path = require("path")

router.post("/msgadd",async (req,resp) => {
    let results = await serviceFactory.frientchatmsgService.update(req.body);
    resp.json(new ResultJson(results,results?"发送成功":"发送失败"));
})


router.get("/sreach",async (req,resp) => {
    let results = await serviceFactory.frientchatmsgService.sreach(req.query);
    resp.json(new ResultJson(results,results?"搜索成功":"搜索失败",results));
})


router.post("/addfriend",async (req,resp) =>{
    console.log(req.body)
    let results = await serviceFactory.frientchatmsgService.add(req.body);
    resp.json(new ResultJson(results,results?"添加成功":"添加失败"))
})
module.exports = router; 