import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./EmployDetailsContainer.module.css";
import UseFetchAllDetails from "../../Services/CustomeQuery/UseFetchAllDetails";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/reducers/ProfileSlice";
import { skillsActions } from "../../store/reducers/SkillsSlice";
import { projectActions } from "../../store/reducers/ProjectSlice";
import empployeeImg from "../../../src/assets/img/employee.webp";
import { useLocation } from "react-router-dom";

const EmployDetailsContainer = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    console.log("data:", data);
  };

  const onError = (error) => {
    console.log("error:", error);
  };

  const { isLoading, data, isError, error, isFetching } = UseFetchAllDetails(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    console.log("data is fetching:", isFetching);
    dispatch(profileActions.isFetchingEmpData(true));
    // dispatch(skillsActions.fetchingStatusUpdate(true));
  }

  if (isError) {
    console.log("data:", error.message);
  }

  useEffect(() => {
    if (data) {
      const profiles = data.employeeDetails[0].profile;
      const skills = data.employeeDetails[1].skills;
      const projects = data.employeeDetails[2].projects;
      dispatch(profileActions.storeAllProfiles(profiles));
      dispatch(skillsActions.storeSkills(skills));
      dispatch(projectActions.storeProjects(projects));
      dispatch(profileActions.isFetchingEmpData(false));
      dispatch(skillsActions.fetchingStatusUpdate(false));
      console.log("inside data in EMP container");
    }
  }, [data, dispatch]);

  return (
    <>
      <h2>EmployDetails</h2>
      <ul className={styles.main}>
        <li>
          <Link to="employDetails">Profile</Link>
        </li>
        <li>
          <Link to="skills">Skills</Link>
        </li>
        <li>
          <Link to="projects">Project</Link>
        </li>
      </ul>
      {pathname === "/profile" && (
        <div>
          <img src={empployeeImg} alt="empImage" className="empImage" />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default EmployDetailsContainer;
