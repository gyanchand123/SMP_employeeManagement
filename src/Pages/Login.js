import React from "react";
import FormContainer from "../components/Form/LoginFormContainer";
import Card from "../utilities/card/Card";
import styles from "./Login.module.css";
 

const Login = () => {
  return (
    <Card dynamicClass={styles.dimension}>
      <FormContainer />
    </Card>
  );
};

export default Login;
