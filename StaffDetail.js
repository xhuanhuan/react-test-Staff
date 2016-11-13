import React from 'react';
class StaffDetail extends React.Component{
  handleClick(num){
    if(num==1){
      var item1= this.props.staffDetail;
      var item = item1;
      let sex = $('#staffEditSex option:selected');
      let id =  $('#staffEditId option:selected');
      item.info.name =  $('#staffEditName').val();
      item.info.age =  $('#staffEditAge').val();
      item.info.descrip =  $('#staffEditDescrip').val();
      item.info.sex = sex.val();
      item.info.id = id.val();
      if(item.info.name=='' || item.info.age =='' || item.info.descrip==''){
        let tips=this.refs.DtipsUnDone;
        tips.style.display='block';
        setTimeout(function(){
                  tips.style.display = 'none';
              }, 1000);
              return;
      }
      let numReg = /^\d+$/;
      if(item.info.age<0||item.info.age>150||!numReg.test(item.info.age)){
        let tips=this.refs.DtipsUnAge;
        tips.style.display='block';
        setTimeout(function(){
                  tips.style.display = 'none';
              }, 1000);
              return;
      }

      let tips=this.refs.Dtips;
      tips.style.display = 'block';
       setTimeout(function(){
              tips.style.display = 'none';
            }, 1000);

      this.props.changeStaffDetail(item1,item);
    //  this.props.closeStaffDetail();
    }else{
      this.props.closeStaffDetail();
      }
    }

  render(){
    var staffDetail = this.props.staffDetail;
    //console.log(staffDetail);
    if(!staffDetail)
       return null;

    return (
             <div className="overLay">
               <h4 style={{'textAlign':'center'}}>点击'完成'保存修改,点击'关闭'放弃未保存修改并退出.</h4>
               <hr/>
               <table ref="editTabel" style={{'width':'40%','margin-left':'30%'}}>
                 <tbody>
                   <tr>
                     <th>姓名</th>
                     <td><input id='staffEditName' type="text" defaultValue={staffDetail.info.name} /></td>
                   </tr>
                   <tr>
                     <th>年龄</th>
                     <td><input id='staffEditAge' type="text" defaultValue={staffDetail.info.age} /></td>
                   </tr>
                   <tr>
                     <th>性别</th>
                     <td>
                       <select ref='selSex' id='staffEditSex'>
                         <option value="男">男</option>
                         <option value="女">女</option>
                       </select>
                     </td>
                   </tr>
                   <tr>
                     <th>身份</th>
                     <td>
                       <select ref="selId" id='staffEditId'>
                         <option value="主任">主任</option>
                         <option value="老师">老师</option>
                         <option value="学生">学生</option>
                         <option value="实习">实习</option>
                       </select>
                     </td>
                   </tr>
                   <tr>
                     <th>个人描述</th>
                     <td><textarea id='staffEditDescrip' type="text" defaultValue={staffDetail.info.descrip}></textarea></td>
                   </tr>
                 </tbody>
               </table>
               <p ref='Dtips' className='tips'>修改成功</p>
               <p ref='DtipsUnDone' className='tips'>请录入完整的人员信息</p>
               <p ref='DtipsUnAge' className='tips'>请录入正确的年龄</p>
               <div style={{'textAlign':'center'}}>
               <button onClick={()=>this.handleClick(1)}>完成</button>
               <button onClick={()=>this.handleClick(2)}>关闭</button>
               </div>
             </div>
         );
  }
}

export default StaffDetail;
