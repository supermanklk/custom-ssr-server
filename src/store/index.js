import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as homeReducer } from "../containers/Home/store/index";
// const reducer = (state = { name: "faith-001" }, action) => {
//   return state;
// };

const reducer = combineReducers({
  home: homeReducer,
});

// 这种写啊是有问题的，原因是服务器渲染，如果这样写所有用户都是共享的一个store
// const store = createStore(reducer, applyMiddleware(thunk));
// export default store

export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
};

export const getClientStore = () => {
  // 数据脱水
  // 我们把存储在window上的数据直接拿来用
  const defaultStore = window.context.state;
  return createStore(reducer, defaultStore, applyMiddleware(thunk));
};
