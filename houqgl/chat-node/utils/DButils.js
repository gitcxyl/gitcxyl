const mysql = require("mysql");
class DButils{

    getConn(){
        let conn  = mysql.createConnection({
            host:"127.0.0.1",
            port:"3306",
            user:"root",
            password:"123",
            database:"chat",
            multipleStatements:true
        });
        return conn;

    }
    executeSql(strSql,params = []){
        let p = new Promise((resolve,reject) => {
            let conn = this.getConn();
            conn.query(strSql,params,(error,results) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(results);
                }
                conn.end();
            })
        })
        return p;
    }
}

module.exports = DButils;