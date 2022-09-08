import React, { useEffect } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import styles from "./EmployDetailsContainer.module.scss";
import UseFetchAllDetails from "../../Services/CustomeQuery/UseFetchAllDetails";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/reducers/ProfileSlice";
import { skillsActions } from "../../store/reducers/SkillsSlice";
import { projectActions } from "../../store/reducers/ProjectSlice";
import empployeeImg from "../../../src/assets/img/employee.webp";
 
  
const EmployDetailsContainer = () => { 
  
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const requiredClasses = (navData) => (navData.isActive?styles.active:'');

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
    console.log("data is fetching PART 1:", isFetching);
    dispatch(profileActions.isFetchingEmpData(true));
    dispatch(skillsActions.fetchingStatusUpdate(true));
    dispatch(projectActions.fetchingProjectStatus(true));
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
      dispatch(projectActions.fetchingProjectStatus(false));
      console.log("inside data in EMP container PART 2");
    }
  }, [data, dispatch]);

  return (
    <>
      <h2>EmployDetails</h2>
      <ul className={`${styles.main} list`}>
        <li>
          <NavLink to="employDetails" className={requiredClasses}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="skills" className={requiredClasses}>Skills</NavLink>
        </li>
        <li>
          <NavLink to="projects" className={requiredClasses}>Project</NavLink>
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
