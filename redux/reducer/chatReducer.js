const initialState = {
  receiver: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RECEIVER':
      return {
        ...state,
        receiver: action.payload,
      };
    case 'DELETE_RECEIVER':
      return {
        ...state,
        receiver: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
