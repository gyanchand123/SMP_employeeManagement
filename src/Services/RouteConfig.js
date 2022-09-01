import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/RegisterFormContainer";
import Welcome from "../Pages/Welcome";
import { AuthContext } from "./Authentication/AuthContext";
import Skills from "../components/EmployeeDetails/Skills";
import Project from "../components/EmployeeDetails/Project";
import EmployDetailsContainer from "../components/EmployeeDetails/EmployDetailsContainer";
import EmployeeDetail from "../components/EmployeeDetails/EmployeeDetail";
//import { useSelector } from "react-redux";

const RouteConfig = () => {
  const { isLoggedIn } = useContext(AuthContext);
  //const {profileDataAvailable:profileIsAvailable} = useSelector((state)=> state.profile);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<Welcome />} />
      {!isLoggedIn && <Route path="/login" element={<Login />} />}
      {isLoggedIn && (
        <>
          <Route path="/profile/*" element={<EmployDetailsContainer />}>
          {/* {profileIsAvailable &&  <Route path="employDetails" element={<EmployeeDetail />} />} */}
          <Route path="employDetails" element={<EmployeeDetail />} />
            <Route path="employDetails/registration" element={<Registration />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Project />} />
          </Route>
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RouteConfig;
