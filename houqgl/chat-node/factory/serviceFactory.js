const path = require("path");
const fs = require("fs");
const serviceFactor = (() =>{
    let obj ={};
    let arr =fs.readdirSync(path.join(__dirname,"../services"));
    for(let item of arr){
        let pripertyName = item.replace(".js","").replace(/^[A-Z]/,p => p.toLowerCase());
       let temp = require(path.join(__dirname,"../services",item));

      if(typeof temp ==="function"){
        obj[pripertyName] = Reflect.construct(temp,[]);

      }
    }
  // console.log(obj)
    return obj;
})()
module.exports = serviceFactor;