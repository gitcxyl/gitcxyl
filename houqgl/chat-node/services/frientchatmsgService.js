
const BaseService = require("./BaseService.js");
const PageList = require("../model/PageList.js");


class frientchatmsgService extends  BaseService{
    constructor(){
        super();
        this.currentTableName = this.tableMap.chat_app;
    }
   
    async update({chatmsg,time,id}){
        let strSql = `update ${this.currentTableName} set chat=?, time=? where id=?`;
        let results = await this.executeSql(strSql,[chatmsg,time,id]);
        return results.affectedRows > 0 ? true : false;
    }

    async sreach({telephone}){
        let strSql = `select * from ${this.currentTableName} where telephone = ?`
        let results = await this.executeSql(strSql,[telephone]);
        return results[0];

    }

    async add({fridents_id,fridents_i,id}){
        if(fridents_i){
        let strSql = `update ${this.currentTableName} set  fridents_id=CONCAT(fridents_id,?)  where id=?`
        let results = await this.executeSql(strSql,[fridents_id,id]);
        return results.affectedRows > 0 ? true : false;
        }
        else{ 
            let strSql = `update ${this.currentTableName} set  fridents_id=? where id=?`
            let results = await this.executeSql(strSql,[fridents_id,id]);
              return results.affectedRows > 0 ? true : false;
        }

      
    }

  
}

module.exports = frientchatmsgService;