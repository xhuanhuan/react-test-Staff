//a reducer takes teo things


//1.the action(info about what happend)
//2.coppy of current state

function posts(state=[],action){
switch(action.type){
  case 'INCREMENT_LINKS':
  console.log("inrementing likes");
  const i=action.index;
  return [
    ...state.slice(0,i),
    {...state[i],likes:state[i].likes+10 },
    ...state.slice(i+1)
  ]

  default:
  return state;
}
}
export default posts;
