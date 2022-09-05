import React from "react";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";
import { useSelector } from "react-redux";

import UseFetchLoggedInUser from "../../Services/CustomHooks/UseFetchLoggedInUser";

const Project = () => {

  console.log("inside project");
  const profiles = useSelector(state => state.profile);
  const { isfetchingStatus, allProjects } = useSelector(state => state.project);  
  const { notificationComponent,matchedProfile } = UseFetchLoggedInUser(profiles); 
 
  if (isfetchingStatus) return notificationComponent;   

  if (allProjects && matchedProfile) {
    const matchedProjectKey = matchedProfile.projects;
    const requiredProjects = [];

    allProjects.forEach(project => {
      if (matchedProjectKey.includes(project.Project_ID)) requiredProjects.push(project);
    });

    const projectContents = requiredProjects.map(project => {
      
      const projectWithModifiedDateFormat = {...project,
        project_Start_Date:new Date( project.project_Start_Date).toLocaleDateString('en-US'),
        project_End_Date:new Date(project.project_End_Date).toLocaleDateString('en-US')
        }
 
      const {Project_ID,Company_Name,Project_Name,Project_Status,project_Start_Date,
             project_End_Date,} = projectWithModifiedDateFormat;  

      return (
      <table key={Project_ID}>
        <tbody>
          <tr>
            <th>Company Name:</th>
            <td> {Company_Name}</td>
          </tr>

          <tr>
            <th>ProjectName : </th>
            <td>{Project_Name}</td>
          </tr>
          <tr>
            <th>ProjectStatus:</th>
            <td>{Project_Status}</td>
          </tr>
          <tr>
            <th>ProjectStartAt :</th>
            <td>{project_Start_Date}</td>
          </tr>
          <tr>
            <th>ProjectEndsOn:</th>
            <td>{project_End_Date}</td>
          </tr>
        </tbody>
      </table>
    )});
    return (
      <Card dynamicClass="center">
        <CommonHeader header="Project Details" />
        {projectContents}
      </Card>
    );  
  }
};

export default Project;
