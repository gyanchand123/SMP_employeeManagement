import React from "react";
import { useSelector } from "react-redux";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";
import classes from "./skills.module.scss";
import CommonButton from "../../utilities/button/CommonButton";
import UseFetchLoggedInUser from "../../Services/CustomHooks/UseFetchLoggedInUser";

const Skills = () => {
  
  console.log("inside skill");
  const profiles = useSelector((state) => state.profile);
  const { isfetchingStatus, allSkills } = useSelector((state) => state.skills);
  const { notificationComponent, matchedProfile } = UseFetchLoggedInUser(profiles);
   

  if (isfetchingStatus) return notificationComponent;

  if (allSkills && matchedProfile) {
    const matchedSkillsKey = matchedProfile.skills;
    const requiredSkills = [];

    allSkills[0].forEach((skill, index) => {
      if (matchedSkillsKey.includes(index)) {
        requiredSkills.push(skill);
      }
    });

    const skillContents = (
      <ul>
        {requiredSkills.map((skill) => (
          <div key={skill} className={classes.containerDiv}>
            <li>{skill}</li>
            <CommonButton btnTitle="delete" btn_type="edit_del" />
          </div>
        ))}
      </ul>
    );

    return (
      <>
        <Card dynamicClass="center">
          <CommonHeader header="Employee Competencies" />
          {skillContents}
        </Card>
        <div className={classes.btnAlign}>
          <CommonButton btnTitle="Add New Skill" />
        </div>
      </>
    );
  }
};

export default Skills;
