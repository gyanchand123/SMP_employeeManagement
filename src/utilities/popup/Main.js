import React from "react";
import BackDrop from "./BackDrop";
import ModelOverLay from "./ModelOverLay";

const Main = (props) => {
  const { title, message } = props;

  return (
    <>
      <BackDrop />
      <ModelOverLay title={title} message={message} />
    </>
  );
};

export default React.memo(Main);
