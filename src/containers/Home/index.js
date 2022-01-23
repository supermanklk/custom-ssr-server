import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { getHomeList } from "./store/action";
import styles from "./index.css";
import ImgList from "./components/ImgList";
import useWithStyle from "../../HocComponent/useWithStyle";
const Home = (props) => {
  useEffect(() => {
    props.getHomeLIst();
  }, []);

  // 这句话代表该组件支持ssr的css渲染
  styles && useWithStyle({ styles });

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

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(Home);

// 服务器数据渲染
// 这个函数,负责在服务器端渲染之前,把这个路由需要的数据提前加载好

// 通过ExportHome是解决 loadData潜在的风险，因为connect能够自动将loadData函数绑定上，如果哪天绑定不上就会出问题
ExportHome.loadData = (store) => {
  // ssr首次渲染页面会匹配渲染的页面路由，如果命中就加载对应组件的数据
  // getHomeList() 返回的是 promise
  // 所以 store.dispatch 返回的也是promise,它对应的就是 axios.post返回的promise
  return store.dispatch(getHomeList(true));
};

export default ExportHome;
