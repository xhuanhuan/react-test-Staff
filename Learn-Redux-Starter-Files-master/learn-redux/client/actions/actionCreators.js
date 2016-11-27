//increment
export function increment(index){
  return {
    type:'INCREMENT_LINKS',
    index
  }
}
//add comments
export function addComment(postId,author,comment){
  console.log("add a comment");
  return {
    type:'ADD_COMMENT',
    postId,
    author,
    comment
  }
}
//remove comment
export function removeComment(postId,i){
  
  return{
    type:'REMOVE_COMMENT',
    i,
    postId
  }
}
