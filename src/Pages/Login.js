import React from "react";
import FormContainer from "../components/Form/LoginFormContainer";
import Card from "../utilities/card/Card";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.topAlign}>
      <Card dynamicClass="center">
        <FormContainer />
      </Card>
    </div>
  );
};

export default Login;
