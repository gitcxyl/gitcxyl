const BaseService = require("./BaseService.js");
const md5 = require("md5-node");
const AppConfig = require("../config/AppConfig.js");
const PageList = require("../model/PageList");

class AdminInfoService extends BaseService{
    constructor(){
        super();
        this.currentTableName = this.tableMap.chat_app;
    }
    async checkLogin({username,password}){
        let strSql = `select * from ${this.currentTableName} where isDel = true and password = ? and username = ?`;
    //    password = md5(password + AppConfig.md5salt);
        // if(/^\w+@\w+\.com$/.test(username)){
        //     strSql += ` and admin_email = ?`
        // }else if(/^1[3456789][0-9]{9}$/.test(username)){
        //     strSql += ` and admin_tel = ?`
        // }else if(/[0-9]{4}/.test(username)){
        //     strSql += ` and username = ?`
        // }
        // else{
        //     strSql += ` and id = ?`
        // }

        let results = await this.executeSql(strSql,[password,username]); 
     
        return results[0];

       
    }
    

    async getListByPage({pageIndex,username}){
        let strSql = `select * from ${this.currentTableName} where isDel = true and fridents_id = ?`;
        let countSql = `select count(*) 'total_count' from ${this.currentTableName} where isDel = true and fridents_id like ?`;
        let strWhere = ``;
        
        
        let results = await this.executeSql(strSql+";"+countSql,[username,username]);
        let pageList = new PageList(pageIndex,results.total_count,this.pageSize,results[0]);
        return pageList;
    }



    async findById(id){
        let strSql = `select * from ${this.currentTableName} where 1 and id = ?`;
        let results = await this.executeSql(strSql,[id]);
        return results[0];
    }

}




module.exports = AdminInfoService;