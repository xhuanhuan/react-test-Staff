import React from 'react';
import StaffItem from './Staffitem.js';
class StaffItemPanel extends React.Component{
// constructor(){
//   super();
//   this.state={
//     number:0
//   };
// }
  handleClick(num,val){
    if(num==1){
        this.props.delStaffItem(val);
    }
    else
    {
      this.props.showDetail(val);
    }

  }
render(){
  let items=[];
  if(this.props.items.length==0){
   items.push(<tr><th colSpan="5" className="tempEmpty">暂无用户</th></tr>);
 }else{
   this.props.items.forEach(item=>{
     items.push(<StaffItem key={item.key} item={item} handleClick={this.handleClick.bind(this)}/>);
   });
 }
  return(
  <div className="Panel">
  <table className='itemPanel' style={{'width':'100%'}}>
      <thead>
        <th className='itemTd'>姓名</th>
        <th className='itemTd'>年龄</th>
        <th className='itemTd'>身份</th>
        <th className='itemTd'>性别</th>
        <th className='itemTd'>操作</th>
      </thead>
      <tbody>{items}</tbody>
    </table>
    </div>
  );
}
}
export default StaffItemPanel
