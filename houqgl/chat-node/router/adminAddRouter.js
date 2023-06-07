const express = require("express");
const router = express.Router();
const serviceFactory = require("../factory/serviceFactory.js");
const ResultJson = require("../model/ResultJson.js");
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const upload = multer({
    dest:path.join(__dirname,"../adminPhoto")
})

//上传文件
router.post("/uploadAdminPhoto",upload.single("file"),(req,resp) => {
   
    let file = req.file;
    if(file){
        fs.renameSync(file.path,file.path + file.originalname);
        resp.json(new ResultJson(true,"文件上传成功",`/adminPhoto/${file.filename + file.originalname}`));
    }else{
        resp.status(404).json(new ResultJson(false,"文件上传失败"));
    }
})



router.post("/adminadd",async (req,resp) => {

    let results = await serviceFactory.adminAddService.add(req.body);
    resp.json(new ResultJson(results,results?"注册成功":"注册失败"));
})


module.exports = router;