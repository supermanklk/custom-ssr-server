const React = require("react");
import { connect } from "react-redux";
import Header from "../../components/Header";
const Home = (props) => {
  return (
    <div>
      <Header />
      <div>welcome to my home!! </div>
      <div>redux 获取的数据 name: {props.name}</div>
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
  name: state.name,
});
export default connect(mapStateToProps, null)(Home);
