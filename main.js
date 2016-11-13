import React from 'react';
import ReactDOM from 'react-dom';
import StaffHeader from './StaffHeader.js';
import StaffItemPanel from './StaffItemPanel.js';
import StaffFooter from './StaffFooter.js';
import StaffDetail from './StaffDetail.js';
import STAFF from './STAFF.js';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            staff : new STAFF,
            staffDetail: null
        };
    }
    addStaffItem(item){
      this.setState({
          staff: this.state.staff.addStaffItem(item)
      });
  }
    delStaffItem(item){
      this.setState({
          staff: this.state.staff.delStaffItem(item)
      });
    }
    showDetail(item){
      this.setState({
          staffDetail: item
      });
    }
    closeStaffDetail(){
      this.setState({
          staffDetail: null
      });
    }
    changeStaffDetail(item1,item){
      this.setState({
          staff: this.state.staff.changeStaffDetail(item1,item)
      });
    }
    searchByname(name){
      this.setState({
          staff: this.state.staff.searchByname(name)
      });
    }
    searchByid(id){
      this.setState({
          staff: this.state.staff.searchByid(id)
      });
    }
    sort(order){
      this.setState({
          staff: this.state.staff.sort(order)
      });
    }
    render(){
      return (
        <div>
          <StaffHeader searchByname={this.searchByname.bind(this)} searchByid={this.searchByid.bind(this)} sort={this.sort.bind(this)}/>
          <StaffItemPanel items={this.state.staff.staff} delStaffItem={this.delStaffItem.bind(this)} showDetail={this.showDetail.bind(this)} />
          <StaffFooter addStaffItem={this.addStaffItem.bind(this)}/>
          <StaffDetail staffDetail={this.state.staffDetail} closeStaffDetail={this.closeStaffDetail.bind(this)} changeStaffDetail={this.changeStaffDetail.bind(this)} />
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
