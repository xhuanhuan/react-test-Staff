import React from 'react';
class staffItem {
    constructor(item){
        this.info = {};
        this.info.name = item.name;
        this.info.age = item.age || 0;
        this.info.sex = item.sex;
        this.info.id = item.id;
        this.info.descrip = item.descrip || '';
        this.key = ++staffItem.key;
    }
}
staffItem.key = 0;

export default class STAFF {

    constructor(){
        this.allStaff = [
            new staffItem(STAFF.rawData[0]),
            new staffItem(STAFF.rawData[1]),
            new staffItem(STAFF.rawData[2]),
            new staffItem(STAFF.rawData[3]),
            new staffItem(STAFF.rawData[4]),
            new staffItem(STAFF.rawData[5]),
            new staffItem(STAFF.rawData[6]),
            new staffItem(STAFF.rawData[7]),
            new staffItem(STAFF.rawData[8]),
            new staffItem(STAFF.rawData[9]),
            new staffItem(STAFF.rawData[10])
        ];
        this.staff = this.allStaff;
    }
      //============新增============
    addStaffItem(item) {
        let newItem = new staffItem(item);
        this.allStaff.push(newItem);
        this.staff = this.allStaff;
        return this;
    }
    //=========删除=================
    delStaffItem(item) {
        let key=this.allStaff.indexOf(item);
        this.allStaff.splice(key,1);
         this.staff = this.allStaff;
        return this;
    }
    //============详情===============
    changeStaffDetail(item1,item){
        let key=this.allStaff.indexOf(item1);
        this.allStaff.splice(key,1,item);
         this.staff = this.allStaff;
        return this;
    }
    //=============查找============
    searchByname(name){
      let searchedStaff;
      if(name==''){
        searchedStaff=this.allStaff;
      }else{
        searchedStaff=this.allStaff.filter(function(item,index,array){
            return (item.info.name==name);
          });
      }
      this.staff=searchedStaff;
      return this;
    }
      searchByid(id){
        let ID=['全部','学生','老师','主任','实习'];
        console.log(id+'xiaohuan');
        let searchedStaff;
        if(id==0){
          searchedStaff=this.allStaff;
        }else{
          searchedStaff=this.allStaff.filter(function(item,index,array){
            return(ID.indexOf(item.info.id)==id);
          });
        }
        this.staff=searchedStaff;
        return this;
      }
      //===============排序================
      sort(num){
      let ID=['全部','学生','老师','主任','实习'];
      var sortstaff=this.allStaff.map(function(item){return item});
      if(num==1){
        sortstaff.sort(function(v1,v2){
            return ID.indexOf(v1.info.id)-ID.indexOf(v2.info.id);
          });
        }else if(num==2){
            sortstaff.sort(function(v1,v2){
            return v1.info.age-v2.info.age;
            });
        }else if(num==3){
          sortstaff.sort(function(v1,v2){
            return v2.info.age-v1.info.age;
          });
        }
        this.staff=sortstaff;
        return this;
        }
}

STAFF.rawData = [{ descrip:'我是一匹来自远方的狼。', sex: '男', age: 20, name: '张三', id: '主任'},
                 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 21, name: '赵静', id: '学生'},
                 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 22, name: '王二麻', id: '学生'},
                 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 24, name: '李晓婷', id: '实习'},
                 { descrip:'我是一匹来自远方的狼。', sex: '男', age: 23, name: '张春田', id: '实习'},
                 { descrip:'我是一匹来自远方的狼。', sex: '男', age: 22, name: '刘建国', id: '学生'},
                 { descrip:'我是一匹来自远方的狼。', sex: '男', age: 24, name: '张八', id: '主任'},
                 { descrip:'我是一匹来自远方的狗。', sex: '男', age: 35, name: '李四', id: '老师'},
                 { descrip:'我是一匹来自远方的猪。', sex: '男', age: 42, name: '王五', id: '学生'},
                 { descrip:'我是一匹来自远方的牛。', sex: '男', age: 50, name: '赵六', id: '实习'},
                 { descrip:'我是一匹来自远方的马。', sex: '男', age: 60, name: '孙七', id: '实习'}];
