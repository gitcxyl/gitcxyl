const BaseService = require("./BaseService.js");
const md5 = require("md5-node");
const AppConfig = require("../config/AppConfig.js");

class AdminInfoService extends BaseService{
    constructor(){
        super();
        this.currentTableName = this.tableMap.chat_app;
    }

    async add({username,password,idcard,telephone, photo}){
        //对密码进行加密加盐处理
        // password = md5(password + AppConfig.md5salt);
        let strSql = `insert into ${this.currentTableName} (username,password,idcard,telephone, photo) value (?,?,?,?,?)`;
        let results = await this.executeSql(strSql,[username,password,idcard,telephone, photo]);
        
        return results.affectedRows > 0 ? true : false;
    }


}

module.exports = AdminInfoService;