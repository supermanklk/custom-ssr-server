const React = require("react");
const Home = () => {
  return (
    <div>
      <div>welcome to my home!!</div>
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
export default Home;
