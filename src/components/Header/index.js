import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to={`/`}>主页</Link>
      <br />
      <Link to={`/jk`}>JK</Link>
    </div>
  );
};

export default Header;
