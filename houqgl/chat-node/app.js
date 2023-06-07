const express = require("express");
const app =express();
const http = require("http");
const path = require("path");
const fs = require("fs");
const AppConfig = require("./config/AppConfig.js");
const ResultJson = require("./model/ResultJson.js");
const server = http.createServer(app);

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit:"30mb"}))
const cors = require("cors");
app.use(cors())
require("express-async-errors");
server.listen(8080,"0.0.0.0",() => {
    console.log("服务器启动成功");
   
    })

app.use((req,resp,next) => {
    resp.setHeader("Access-control-Allow-Origin","*");
    resp.setHeader("Access-control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    resp.setHeader("Access-control-Allow-Headers","rental_house_token");
    next();
})





 



app.use("/stuglInfo",require("./router/studentglServiseRoute.js"));
app.use("/roomInfo",require("./router/roomRouter.js"));
app.use("/login",require("./router/loginRouter.js"));
app.use("/studentUpdate",require("./router/studentUpadte.js"))
app.use("/frientchatmsg",require("./router/frientchatmsgRouter.js"))




app.use("/adminPhoto",express.static(path.join(__dirname,"adminPhoto")));
app.use("/adminInfo",require("./router/adminAddRouter.js"))
//全局异常捕获
app.use((error,req,resp,next) => {
    console.log(error);
    resp.status(500).json(new ResultJson(false,"数据请求失败",error));
    next();
})