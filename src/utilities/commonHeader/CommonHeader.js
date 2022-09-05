import React from "react";

const CommonHeader = (props) => {
  return (
    <header>
      <h3>{props.header}</h3>
    </header>
  );
};

export default React.memo(CommonHeader);
