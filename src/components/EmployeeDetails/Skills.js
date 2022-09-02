import React, { useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import Notification from "../../utilities/UI/Notification";
import { AuthContext } from "../../Services/Authentication/AuthContext";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";


const Skills = () => {
  
  const { isLoading, allSkills } = useSelector((state) => state.skills);
  const { loggedInEmail } = useContext(AuthContext);
  const profiles = useSelector((state) => state.profile);

  console.log("inside skill");

  const matchedProfile = useMemo(
    () =>
      profiles.allProfile.find((profile) => profile.Email === loggedInEmail),
    [profiles, loggedInEmail]
  );

  if (isLoading) {
    console.log("inside skill loading status:", isLoading);
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

  if (allSkills && matchedProfile) {

    const matchedSkillsKey = matchedProfile.skills;
    const requiredSkills = [];

    allSkills[0].forEach((skill, index) => {
      if (matchedSkillsKey.includes(index)) {
        requiredSkills.push(skill);
      }
    });

    return (
      <Card dynamicClass='center'>
      <CommonHeader header='Employee Competencies'/> 
      <ul>
        {requiredSkills.map((skill) => (
          <div key={skill}>
            <li>{skill}</li>
          </div>
        ))}
      </ul>
      </Card>    
    );
  }
};

export default Skills;
