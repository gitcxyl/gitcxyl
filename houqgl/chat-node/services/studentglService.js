const BaseService = require("./BaseService.js");
const PageList = require("../model/PageList");


class RstudentglService extends  BaseService{
    constructor(){
        super();
        this.currentTableName = this.tableMap.student_info;
    }


    async findById(id){
        let strSql = `select * from ${this.currentTableName} where 1 and id = ?`;
        let results = await this.executeSql(strSql,[id]);
        return results[0];
    }
//学生信息分页查询
   async getAllList({stu_name,pageIndex}){
        let strSql = `select * from ${this.currentTableName} where isDel = true`;
        let countSql = `select count(*) 'total_count' from ${this.currentTableName} where isDel = true`;
        let strWhere = ``;
        let ps = [];
        if(stu_name){
           strWhere +=` and stu_name like ?`
            ps.push(`${stu_name}`);
            

        }

        
        strSql += `${strWhere} limit ${(pageIndex - 1) * this.pageSize} , ${this.pageSize}`;
        countSql += strWhere;
        let results = await this.executeSql(strSql + ";" + countSql,[...ps,...ps]);
        let pageList = new PageList(pageIndex,results[1][0].total_count,this.pageSize,results[0]);
        return pageList;
    }
//新增学生
    async addStudent({stu_name,stu_id,stu_sex,stu_age,stu_teachter,stu_classes,stu_address,stu_college,stu_bd,stu_room,stu_tel,isDel}){

        let strSq2 = `insert into resident_info (stu_id,resident_name,resident_tel,resident_teacher,resident_classes,resident_collage,idCar,sname,isDel) value (?,?,?,?,?,?,?,?,?)`
        let strSql = `insert into student_info (stu_name,stu_id,stu_sex,stu_age,stu_teachter,stu_classes,stu_address,stu_college,stu_bd,stu_room,stu_tel,isDel) value (?,?,?,?,?,?,?,?,?,?,?,?)`
        let strSq3 = `update room_info set pepol_count=(select count(*) from resident_info where isDel = true and idCar = ${stu_bd} and sname = ${stu_room}) where isDel = true and idCar =? and sname =?`

        


        let restults = await this.executeSql(strSql+";"+strSq2+";"+strSq3,[stu_name,stu_id,stu_sex,stu_age,stu_teachter,stu_classes,stu_address,stu_college,stu_bd,stu_room,stu_tel,isDel,stu_id,stu_name,stu_tel,stu_teachter,stu_classes,stu_college,stu_bd,stu_room,isDel,stu_bd,stu_room]);
        return restults[0].affectedRows > 0 ? true : false;
        
    }

    //学生所属学院信息
    async seekList({idCar}){
        this.currentTableName = this.tableMap.college_info;
        
        let strSql = `select * from ${this.currentTableName} where isDel = true`;
      
        if(idCar)
        {
            this.currentTableName = this.tableMap.classes_info;
            var strSq2 = `select * from ${this.currentTableName} where isDel = true and idCar = ?`
            let restults = await this.executeSql(strSq2,[idCar])
           
            return restults;
        }
        else{
         
             return this.executeSql(strSql)
        }
    
    }
//学生入住信息
    async roomList({idCar}){
        this.currentTableName = this.tableMap.floor_info;
        
        let strSql = `select * from ${this.currentTableName} where isDel = true`;
      
        if(idCar)
        {
            this.currentTableName = this.tableMap.room_info;
            var strSq2 = `select * from ${this.currentTableName} where isDel = true and idCar = ?`
            let restults = await this.executeSql(strSq2,[idCar])
           
            return restults;

        }
      
        else{
             return this.executeSql(strSql)
        }
    
    }
//学生所属教师列表

async teacherList(){
        this.currentTableName = this.tableMap.teachter_info;
        {
            var strSq2 = `select * from ${this.currentTableName} where isDel = true`
            let restults = await this.executeSql(strSq2)
           
            return restults;

}

}
//学生户籍

async addressList({pageIndex}){
    this.currentTableName = this.tableMap.address_info;
    let strSql = `select * from ${this.currentTableName} where isDel = true and pageIndex = ?`;
let restults = await this.executeSql(strSql,[pageIndex])
return restults;
}

//软删除
async deldetestu(id){
    let strSql = `update ${this.currentTableName} set isDel = false where id = ?`;
let results = await this.executeSql(strSql,[id]);
return results.affectedRows > 0 ? true : false;
}

//导出exce表格
exportExcel({stu_name}){
    let strSql = `select * from ${this.currentTableName} where isDel = true `;
    let strWhere = ``;
    let ps = [];
    if(stu_name){
        strWhere += ` and stu_name like ?`
        ps.push(stu_name);
    }
    strSql += strWhere;
    return this.executeSql(strSql,ps);
}






async checkLogin({username,password}){
    let strSql = `select * from ${this.currentTableName} where isDel = true and stu_id = ? `;
   
    
  if(/^1[3456789][0-9]{9}$/.test(username)){
        strSql += ` and stu_tel = ?`
    }
    let results = await this.executeSql(strSql,[password,username]); 
   
    return results[0];
   
}







}

module.exports = RstudentglService;