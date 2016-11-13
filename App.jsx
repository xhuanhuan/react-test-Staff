import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            Hello World!!!<br />
            欢迎来到菜鸟教程学习！！！
         </div>
      );
   }
}
//========================
class Counter extends React.Component{
  constructor() {
  super();
  this.state= {clickCount: 0 , opacity: 1.0};
  }
  handleClick() {
    this.setState({
    clickCount: this.state.clickCount + 1,
    //opacity:this.state.opacity
    });
  }
  //====================
  componentDidMount(){
    this.timer=setInterval(function(){
      var opacity=this.state.opacity;
      opacity-=0.5;
      if(opacity<0.1){
        opacity=1.0;
      }
      this.setState({
        //clickCount: this.state.clickCount,
        opacity:opacity,
      })
    }.bind(this),500);
  }
  render() {
    return (
      <div>
      <h2 style={{opacity:this.state.opacity}} onClick={()=>this.handleClick()}>点我！点击次数为: {this.state.clickCount}</h2>
      <Content myNumber={this.state.clickCount}></Content>
      </div>
    );
  }
};

//=======================
class Content  extends React.Component{
  componentWillMount() {
      console.log('Component WILL MOUNT!')
  }
  componentDidMount() {
       console.log('Component DID MOUNT!')
  }
  componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
  }
  componentWillUnmount() {
         console.log('Component WILL UNMOUNT!')
  }
  render() {
      return (
        <div>
          <h3>{this.props.myNumber}</h3>
        </div>
      );
    }
}
//======================
var UserGist = React.createClass({
        getInitialState: function() {
          return {
            username: '',
            lastGistUrl: ''
          };
        },

        componentDidMount: function() {
          this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            this.setState({
              username: lastGist.owner.login,
              lastGistUrl: lastGist.html_url
            });
          }.bind(this));
        },

        componentWillUnmount: function() {
          this.serverRequest.abort();
        },

        render: function() {
          return (
            <div>
              {this.state.username} 用户最新的 Gist 共享地址：
              <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
            </div>
          );
        }
      });
//=========================
class HellowMessage extends React.Component{
constructor(){
  super();
  this.state={value:'Hello XiaoHuanHuan!'};
  this.handleChange = this.handleChange.bind(this);
};
  handleChange(event){
        this.setState({value:event.target.value});
  };
  render(){
    return(
      // <div>
      // <input type="text" value={this.state.value} onChange={this.handleChange} />
      // <h4>{this.state.value}</h4>
      // </div>
      <Content1 myDataProp={this.state.value} updateStateProp={this.handleChange} />
    );
   }
 }
 //==============
 var Content1 = React.createClass({
   render: function() {
     return  <div>
             <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} />
             <h4>{this.props.myDataProp}</h4>
             </div>;
   }
 });
 //-------refs----------
 class Mycomponent extends React.Component{
   constructor(){
     super();
     this.handleClick=this.handleClick.bind(this);
   }
   handleClick(){
     console.log(1);
     this.refs.myInput.focus();
   }
   render(){
     return(
       <div>
       <input type="text" ref="myInput" />
       <button onClick={this.handleClick}>点我</button>
       </div>
     );
   }
 }
export default Mycomponent
