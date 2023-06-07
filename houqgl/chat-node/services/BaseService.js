const DButils = require("../utils/DButils.js");

class BaseService extends DButils{
    constructor(){
        super();
        this.tableMap ={
            student_info:"student_info",
            college_info:"college_info",
            classes_info:"classes_info",
            floor_info:"floor_info",
            room_info:"room_info",
            admin_info:"admin_info",
            teachter_info:"teachter_info",
            address_info:"address_info",
            resident_info:"resident_info",
            repair_info:"repair_info",
            chat_app:"chat_app"
        }
         this.currentTableName ="";
         this.pageSize = 10;
    }
}

module.exports = BaseService;