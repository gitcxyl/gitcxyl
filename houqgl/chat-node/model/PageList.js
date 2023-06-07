class PageList{
    constructor(pageIndex,totalCount,pageSize,listData,count){
        this.pageIndex = pageIndex;//当前第几页
        this.totalCount = totalCount;//共多少条
        this.pageCount = Math.ceil(totalCount / pageSize);//共多少页
        this.listData = listData;
        this.pageStart = this.pageIndex - 3 > 0 ? this.pageIndex - 3 : 1;
        this.pageEnd = this.pageStart + 6 > this.pageCount ? this.pageCount : this.pageStart + 6;
       
    }
}

module.exports = PageList;