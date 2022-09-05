import React from "react";
import "./Card.Module.scss";

const Card = ({ children, dynamicClass, differentBg }) => {
  return (
    <div
      className={`card ${dynamicClass==='center'&& 'middle-Aligment'} ${
        differentBg && "registrationBackground"
      } `}
    >
      {children}
    </div>
  );
};

export default React.memo(Card);
