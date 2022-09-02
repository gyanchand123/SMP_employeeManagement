import React, { useContext, useMemo } from "react";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Services/Authentication/AuthContext";
import Notification from "../../utilities/UI/Notification";

const Project = () => {
  console.log("inside project");

  const { isfetchingStatus, allProjects } = useSelector(
    (state) => state.project
  );
  const { loggedInEmail } = useContext(AuthContext);
  const profiles = useSelector((state) => state.profile);

  const matchedProfile = useMemo(
    () =>
      profiles.allProfile.find((profile) => profile.Email === loggedInEmail),
    [profiles, loggedInEmail]
  );

  if (isfetchingStatus) {
    console.log("inside project loading status:", isfetchingStatus);
    return (
      <div className="notificationAlign">
        <Notification
          className
          status="loading"
          message="....please be patient"
          title="loading.................."
        />
      </div>
    );
  }

  if (allProjects && matchedProfile) {
    const matchedProjectKey = matchedProfile.projects;
    const requiredProjects = [];

    console.log("all projects", allProjects);
    console.log("match project key", matchedProjectKey);

    allProjects.forEach((project, index) => {
      if (matchedProjectKey.includes(project.Project_ID)) {
        requiredProjects.push(project);
      }
    });

    console.log("required projects:", requiredProjects);
    const content = requiredProjects.map((project) => (
      <table key={project.Project_ID}>
        <tbody>
          <tr>
            <th>Company Name:</th>
            <td> {project.Company_Name}</td>
          </tr>

          <tr>
            <th>ProjectName : </th>
            <td>{project.Project_Name}</td>
          </tr>
          <tr>
            <th>ProjectStatus:</th>
            <td>{project.Project_Status}</td>
          </tr>
          <tr>
            <th>ProjectStartAt :</th>
            <td>{project.project_Start_Date}</td>
          </tr>
          <tr>
            <th>ProjectEndsOn:</th>
            <td>{project.project_End_Date}</td>
          </tr>
        </tbody>
      </table>
    ));
    return (
      <Card dynamicClass="center">
        <CommonHeader header="Project Details" />
        {content}
      </Card>
    );
  }
};

export default Project;
