import React from 'react';
//import StaffDetail from './StaffDetail.js';
class StaffFooter extends React.Component{

  handleClick(evt){
    let item = {};
     evt.preventDefault();
    let addForm = $('.addForm');
    let sex = $('#staffAddSex option:selected');
    let id =  $('#staffAddId option:selected');

    item.name =  $('#staffAddName').val();
    item.age =  $('#staffAddAge').val();
    item.descrip =  $('#staffAddDescrip').val();
    item.sex = sex.val();
    item.id = id.val();
//---验证-----
    if(item.name=='' || item.age =='' || item.descrip==''){
      let tips=this.refs.tipsUnDone;
      tips.style.display='block';
      setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
    }
    let numReg = /^\d+$/;
    if(item.age<0||item.age>150||!numReg.test(item.age)){
      let tips=this.refs.tipsUnAge;
      tips.style.display='block';
      setTimeout(function(){
                tips.style.display = 'none';
            }, 1000);
            return;
    }

    this.props.addStaffItem(item);
    addForm[0].reset();

    //--------SUCCESS=---------
    let tips=this.refs.tips;
    tips.style.display = 'block';
     setTimeout(function(){
            tips.style.display = 'none';
          }, 1000);
  }
  render(){
        return (
          <div className="Footer">
            <h4 className="footerTitle">人员新增</h4>
            <hr/>
            <form ref='addForm' className="addForm">
                <div>
                  <label for='staffAddName' style={{'display': 'block','color':'blue'}}>姓名</label>
                  <input ref='addName' id='staffAddName' type='text' placeholder='Your Name' />
                </div>
                <div>
                  <label for='staffAddAge' style={{'display': 'block','color':'blue'}}>年龄</label>
                  <input ref='addAge' id='staffAddAge' type='text' placeholder='Your Age(0-150)'/>
                </div>
                <div>
                  <label for='staffAddSex' style={{'display': 'block','color':'blue'}}>性别</label>
                  <select ref='addSex' id='staffAddSex'>
                    <option value='男'>男</option>
                    <option value='女'>女</option>
                  </select>
                </div>
                <div>
                  <label for='staffAddId' style={{'display': 'block','color':'blue'}}>身份</label>
                  <select ref='addId' id='staffAddId'>
                    <option value='主任'>主任</option>
                    <option value='老师'>老师</option>
                    <option value='学生'>学生</option>
                    <option value='实习'>实习</option>
                  </select>
                </div>
                <div>
                  <label for='staffAddDescrip' style={{'display': 'block','color':'blue'}}>个人描述</label>
                  <textarea ref='addDescrip' id='staffAddDescrip' type='text'></textarea>
                </div>
                <p ref="tips" className='tips' >提交成功</p>
                <p ref='tipsUnDone' className='tips'>请录入完整的人员信息</p>
                <p ref='tipsUnAge' className='tips'>请录入正确的年龄</p>
                <div>
                  <button style={{'color':'blue'}} onClick={this.handleClick.bind(this)}>提交</button>
                </div>
            </form>

          </div>
        )
    }
}
export default StaffFooter
