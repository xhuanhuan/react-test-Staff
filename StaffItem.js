import React from 'react';
class StaffItem extends React.Component{
handleClick(num,val){

  this.props.handleClick(num,val);
}
render(){
  return(
    <tr>
    <td className='itemTd'>{this.props.item.info.name}</td>
    <td className='itemTd'>{this.props.item.info.age}</td>
    <td className='itemTd'>{this.props.item.info.id}</td>
    <td className='itemTd'>{this.props.item.info.sex}</td>
    <td className='itemTd'>
    <button id="itemdel" className='itemBtn' onClick={()=>this.handleClick(1,this.props.item)}>删除  </button>
    <button id="itemdetail" className='itemBtn' onClick={()=>this.handleClick(2,this.props.item)}>详情</button>
    </td>
    </tr>

  );
}
}
export default StaffItem;
