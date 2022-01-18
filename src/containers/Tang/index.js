import React, { useEffect } from "react";
import Header from "../../components/Header";
const Tang = () => {
  useEffect(() => {
    console.log("faith=============测试hooks语法");
  }, []);

  return (
    <div>
      <Header />
      <div>JK小姐姐+</div>
    </div>
  );
};

export default Tang;
