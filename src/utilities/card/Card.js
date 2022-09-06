import React from "react";
import  './Card.scss';

const Card = ({ children, dynamicClass, differentBg,skill }) => {

  const requiredClasses = `card   
  ${dynamicClass === "center" && "middle-Aligment"}
  ${differentBg &&  "registrationBackground"}
  ${skill && "modal modalAlignment"} `;

  return <div className={requiredClasses}>{children}</div>;
};

export default React.memo(Card);
