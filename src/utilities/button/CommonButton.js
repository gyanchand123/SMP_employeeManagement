import React from "react";
import classes from "./CommonBtn.module.scss";

const CommonButton = ({ btnTitle, btn_type,...rest }) => {

  const requireClasses = `${classes.btn} ${
    btn_type === "edit_del" ? classes.edit_delete : classes.generalBtnBackgrd
  }`;

  return (
    <div>
      <button className={requireClasses} {...rest}>{btnTitle}</button>
    </div>
  );
};

export default React.memo(CommonButton);
