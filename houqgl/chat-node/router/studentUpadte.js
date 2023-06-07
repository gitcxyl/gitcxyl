        
        const { query } = require("express");
        const experss = require("express");
        const router = experss.Router();
        const serviceFactory = require("../factory/serviceFactory.js");
        const ResultJson = require("../model/ResultJson.js");
        const ExcelUtils = require("../utils/Excelutils.js");
        
        //修改

        router.get("/stupdate", async (req,resp) => {
            console.log(req.query)
            let results = await serviceFactory.studentUpdateService.update(req.query);        
            let flag = results ?true:false;
        resp.json(new ResultJson(flag, flag?"修改成功":"修改失败"))

        })

        module.exports = router;
            