import React, { useEffect, useContext } from "react";
import HttpContext from "../../server/httpContext";
import { connect } from "react-redux";
import { getHomeList } from "./store/action";
import styles from "./index.css";
import { isBrowser } from "../../utils";
import ImgList from "./components/ImgList";
const Home = (props) => {
  let context = useContext(HttpContext);

  useEffect(() => {
    props.getHomeLIst();
  }, []);

  // 这段代码只在ssr上执行
  if (!isBrowser()) {
    // 拿到在 server/utils内定义的context （src/server/utils.js）
    // 主要是做 404 页面
    console.log("faith=============", styles);
    context.staticContext.css.push(styles._getCss());
  }

  return (
    <div>
      <div style={{ color: "blue" }}>welcome to my home!! </div>
      <div className={styles.test}>redux 获取的数据 name: {props.name}</div>
      ========================================================================
      {props.newLists &&
        props.newLists.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.issue}
            </div>
          );
        })}
      ========================================================================
      <br />
      <button
        onClick={() => {
          alert("click");
        }}
      >
        click here
      </button>
      <ImgList />
    </div>
  );
};

// 服务器数据渲染
// 这个函数,负责在服务器端渲染之前,把这个路由需要的数据提前加载好
Home.loadData = (store) => {
  // ssr首次渲染页面会匹配渲染的页面路由，如果命中就加载对应组件的数据
  // getHomeList() 返回的是 promise
  // 所以 store.dispatch 返回的也是promise,它对应的就是 axios.post返回的promise
  return store.dispatch(getHomeList(true));
};

const mapStateToProps = (state) => ({
  name: state.home.name,
  newLists: state.home.newLists,
  zhangbin: state,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeLIst() {
    dispatch(getHomeList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
