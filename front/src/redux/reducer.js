const initState = {isLoggedUser: ''}

const Reducer = (state=initState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        isLoggedUser: action.isLoggedUser
      }
    default:
      return state;
  }
}

export default Reducer;