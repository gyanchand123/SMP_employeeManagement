import React from "react";
import notifyClasses from "./Notification.module.css";

const Notification = (props) => {
  
  const { status, title, message } = props;

  let statusClass;

  if (status === "error") {
    statusClass = notifyClasses.error;
  }
  if (status === "success") {
    statusClass = notifyClasses.success;
  }

  if(status==='loading') statusClass=notifyClasses.loading;

  const requiredClasses = `${notifyClasses.notification} ${statusClass} `;
  
  return (
    <section className={requiredClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
