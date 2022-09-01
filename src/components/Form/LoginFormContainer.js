import React, { useReducer, useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControl from "./FormControl";
import { AuthContext } from "../../Services/Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const FormContainer = () => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const initialState = {
    formTitle: "LogIn user",
    isLogin: true,
  };

  // for loading while login or logout:
  const [isLoading, setIsLoading] = useState(false);
  const [postSendError, setPostSendError] = useState(null);

  const toggleReducer = (previousState, action) => {
    if (action.type === "sigIn") {
      return {
        formTitle: "Register user",
        isLogin: false,
      };
    }
    if (action.type === "signOut") {
      return {
        formTitle: "LogIn user",
        isLogin: true,
      };
    }
    return previousState;
  };

  const [toggleState, dispatch] = useReducer(toggleReducer, initialState);

  const toggle = () => {
    if (toggleState.isLogin) dispatch({ type: "sigIn" });
    else dispatch({ type: "signOut" });
  };

  const initialFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email format").required("*required"),
    password: Yup.string().required("*required"),
  });

  const handleSubmit = (formValues, onSubmitProps) => {
    console.log("submited values:", formValues);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    let signIn_signupUrl;

    if (toggleState.isLogin) {
      signIn_signupUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7cxikkt8p_3NQELrqFmQhjwAdGJczSMY";
    } else {
      signIn_signupUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7cxikkt8p_3NQELrqFmQhjwAdGJczSMY";
    }

    const signUpRequest = async () => {
      setIsLoading(true);
      const response = await fetch(signIn_signupUrl, {
        method: "POST",
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const expirationTimeProvidedByServer = new Date(
        new Date().getTime() + +responseData.expiresIn * 1000
      );
      AuthCtx.login(
        responseData.idToken,
        expirationTimeProvidedByServer.toISOString(),
        formValues.email
      );
      navigate("/", { replace: true });
      return responseData;
    };

    try {
      signUpRequest();
    } catch (error) {
      setPostSendError(error.message);
      alert(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
          return (
          <>
            <h2> {toggleState.formTitle}</h2>
            <Form>
              <FormControl
                control="input"
                label="Email"
                type="email"
                name="email"
              />
              <FormControl
                control="input"
                label="Password"
                type="password"
                name="password"
              />
              <div className="form-control">
                <button
                  type="submit"
                  disabled={
                    !(formik.dirty && formik.isValid) || formik.isSubmitting
                  }
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "3px",
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>
            {!isLoading && (
              <div>
                <>
                  <span>
                    {toggleState.isLogin ? "New user" : "Existing user"} --
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={toggle}
                  >
                    {toggleState.isLogin ? "SignUp" : "SignIn"}
                  </span>
                </>
              </div>
            )}
            {isLoading && <p>....loading</p>}
            {postSendError && !isLoading && <p>{postSendError}</p>}
          </>
        );
      }}
    </Formik>
  );
};

export default FormContainer;
