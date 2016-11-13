import React from 'react';
class StaffHeader extends React.Component{
  constructor(){
    super();
    this.state={
      name:'',
      id  :'',
      order:0
    }
  }
  handleChange(event){
        this.setState({name:event.target.value},function(){this.props.searchByname(this.state.name)});
  }
  searchByid(event){
        this.setState({id:$('#idSelect option:selected').val()},function(){this.props.searchByid(this.state.id)});
  }
  sort(event){
        this.setState({order:$('#orderSelect option:selected').val()},function(){this.props.sort(this.state.order)});
  }
  render(){
    return(
      <div className="Header">
      <h3 style={{'textAlign':'center'}}>人员管理系统</h3>
      <table>
      <tbody><tr>
      <td className="headerTd"><input ref='in' placeholder={"search..."} onChange={this.handleChange.bind(this)} /></td>
      <td className="headerTd"><label>人员筛选</label>
      <select id='idSelect' onChange={this.searchByid.bind(this)} >
      <option value='0'>全部</option>
      <option value='1'>学生</option>
      <option value='2'>老师</option>
      <option value='3'>主任</option>
      <option value='4'>实习</option>
      </select></td>
      <td className="headerTd"><label>排序方式</label>
      <select id='orderSelect' defaultValue='0' onChange={this.sort.bind(this)}>
      <option value='0'>全部</option>
      <option value='1'>身份</option>
      <option value='2'>年龄_升序</option>
      <option value='3'>年龄_降序</option>
      </select></td>
      </tr></tbody>
      </table>
      </div>
    );
  }
}
export default StaffHeader
