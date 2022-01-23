import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
const Tang = () => {
  useEffect(() => {
    console.log("faith=============测试hooks语法");
  }, []);

  const [redirect, setRedirect] = useState(true);

  return (
    <div>
      <Header />
      {redirect ? <div>JK小姐姐+</div> : <Navigate to="/" />}
    </div>
  );
};

export default Tang;
