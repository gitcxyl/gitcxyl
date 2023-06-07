const BaseService = require("./BaseService.js");
const PageList = require("../model/PageList");


class studentUpdateService extends  BaseService{
    constructor(){
        super();
        this.currentTableName = this.tableMap.student_info;
    }


async update({id,stu_name,stu_id,stu_sex,stu_age,stu_classes,stu_college,stu_bd,stu_room,stu_tel}){
    let strSql = `update student_info set stu_name=?, stu_id=?, stu_sex=?, stu_age=?, stu_classes=? ,stu_college=? ,stu_bd=?, stu_room=?, stu_tel=? where id=?`;
    let results = await this.executeSql(strSql,[stu_name,stu_id,stu_sex,stu_age,stu_classes,stu_college,stu_bd,stu_room,stu_tel,id]);
    return results.affectedRows > 0 ? true : false;
}
}
module.exports = studentUpdateService