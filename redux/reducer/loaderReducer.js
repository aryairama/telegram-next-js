const initialState = {
  show: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOW':
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
};

export default loaderReducer;
