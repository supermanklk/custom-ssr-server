import { CHANGE_LIST } from "./contants";
const defaultState = {
  name: "faith-001",
  newLists: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LIST:
      return {
        ...state,
        newLists: action.list,
      };
    default:
      return state;
  }
};

export default reducer;
