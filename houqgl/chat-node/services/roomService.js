const BaseService = require("./BaseService.js");
const PageList = require("../model/PageList.js");

class RoomService extends  BaseService{
    constructor(){
        super();
        this.currentTableName = this.tableMap.room_info;
    }

    async roomList({pageIndex,sname,idCar}){
       let strSql = `select * from ${this.currentTableName} where isDel = 1`;
        let countSql = `select count(*) 'total_count' from ${this.currentTableName} where isDel = 1`;
       
        let strWhere = ``;
        let ps = [];
        if(sname){
           strWhere +=` and sname like ?`
            ps.push(`${sname}`);
            

        }
        if(idCar){
            strWhere +=` and idCar like ?`
            ps.push(`${idCar}`);
        }
        strSql += `${strWhere} limit ${(pageIndex - 1) * this.pageSize} , ${this.pageSize}`;
        countSql += strWhere;
       
        let results = await this.executeSql(strSql + ";" + countSql,[...ps,...ps]);
        let pageList = new PageList(pageIndex,results[1][0].total_count,this.pageSize,results[0]);
        return pageList;
    }

//软删除
async deldetestu(id){
    let strSql = `update ${this.currentTableName} set isDel = false where id = ?`;
let results = await this.executeSql(strSql,[id]);
return results.affectedRows > 0 ? true : false;
}

    //导出exce表格
exportExcel({room_name}){
    let strSql = `select * from ${this.currentTableName} where isDel = true `;
    let strWhere = ``;
    let ps = [];
    if(room_name){
        strWhere += ` and room_name like ?`
        ps.push(room_name);
    }
    strSql += strWhere;
    return this.executeSql(strSql,ps);
}

//新增房间
async addroom({room_bd,roomadmin,sname,isDel,idCar,max_count,pepol_count}){
    let strSql = `insert into ${this.currentTableName} (room_bd,roomadmin,sname,isDel,idCar,max_count,pepol_count) value (?,?,?,?,?,?,?)`

    let restults = await this.executeSql(strSql,[room_bd,roomadmin,sname,isDel,idCar,max_count,pepol_count]);
    return restults.affectedRows > 0 ? true : false;
    
}
//感觉id查询房间
async findById(id){
    let strSql = `select * from ${this.currentTableName} where 1 and id = ?`;
    let results = await this.executeSql(strSql,[id]);
    return results[0];
}

//修改房间

async update({resident_tearchter,resident_name,resident_tel,sname,isDel,idCar,id}){
    let strSql = `update ${this.currentTableName} set resident_tearchter=?, resident_name=?,  resident_tel=?, sname=?, isDel=?, idCar=? where id=?`;
    let results = await this.executeSql(strSql,[resident_tearchter,resident_name,resident_tel,sname,isDel,idCar,id]);
    return results.affectedRows > 0 ? true : false;
}

}
module.exports = RoomService;