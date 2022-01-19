import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as homeReducer } from "../containers/Home/store/index";
// const reducer = (state = { name: "faith-001" }, action) => {
//   return state;
// };

import clientAxios from "../client/request";
import serverAxios from "../server/request";

const reducer = combineReducers({
  home: homeReducer,
});

// 这种写啊是有问题的，原因是服务器渲染，如果这样写所有用户都是共享的一个store
// const store = createStore(reducer, applyMiddleware(thunk));
// export default store

//改变服务器端store的内容,那么就一定要使用serverAxios
export const getStore = () => {
  return createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(serverAxios))
  );
};

// 改变客户端store的内容,一定要使用clientAxios
export const getClientStore = () => {
  // 数据脱水
  // 我们把存储在window上的数据直接拿来用
  const defaultStore = window.context.state;
  return createStore(
    reducer,
    defaultStore,
    applyMiddleware(thunk.withExtraArgument(clientAxios))
  );
};
