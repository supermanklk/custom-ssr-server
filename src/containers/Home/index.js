import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { getHomeList } from "./store/action";
const Home = (props) => {
  useEffect(() => {
    props.getHomeLIst();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ color: "blue" }}>welcome to my home!! </div>
      <div>redux 获取的数据 name: {props.name}</div>
      ========================================================================
      {props.newLists &&
        props.newLists.map((item) => {
          return (
            <div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.home.name,
  newLists: state.home.newLists,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeLIst() {
    dispatch(getHomeList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
