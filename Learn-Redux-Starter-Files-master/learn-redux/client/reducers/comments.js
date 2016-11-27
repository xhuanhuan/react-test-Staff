//a reducer takes twso things


//1.the action(info about what happend)
//2.coppy of current state
function postComments(state=[],action){
  switch(action.type){
    case 'ADD_COMMENT':
      return [...state,{
      user:action.author,
      text:action.comment
      }
    ];
    case 'REMOVE_COMMENT':
    console.log("delete a comment");
    return[
    ...state.slice(0,action.i),
    ...state.slice(action.i+1)
    ];

  default:
  return state;
  }
  return state;
}

function comments(state=[],action){
  if(typeof action.postId!=='undefined')
  return{
    //current
    ...state,
    //overwrite the post with a new one
    [action.postId]:postComments(state[action.postId],action)
  }
  return state;
}
export default comments;
