import React, { useContext} from "react";
import { useSelector } from "react-redux";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";
import classes from "./skills.module.scss";
import CommonButton from "../../utilities/button/CommonButton";
import UseFetchLoggedInUser from "../../Services/CustomHooks/UseFetchLoggedInUser";
import Main from "../../utilities/popup/Main";
import { PopUpContext } from "../../Services/PopUpContext/PopUpContext";

const Skills = () => {
  
  console.log("inside skill PART 3");
  const profiles = useSelector((state) => state.profile);
  const { isfetchingStatus, allSkills } = useSelector((state) => state.skills);
  console.log("inside skill PART 3 fetch",allSkills);
  const { notificationComponent, matchedProfile } = UseFetchLoggedInUser(profiles);
  const {popUpState,togglePopUp} =useContext(PopUpContext);
    

  if (isfetchingStatus) return notificationComponent;

  if (allSkills && matchedProfile) {
    const matchedSkillsKey = matchedProfile.skills;
    const collectiveSkills = allSkills[0];
    const skillsToBeDisplay = [];
/* 
    console.log("matchedSkillsKey:",matchedSkillsKey);
    console.log('get skills',collectiveSkills); */

    Object.keys(collectiveSkills).forEach(key => {
     /*  console.log('each key',key);
      console.log('each value',collectiveSkills[key]); */
      if(matchedSkillsKey.includes(+key)) {
        skillsToBeDisplay.push(collectiveSkills[key]);
      } 
    });

 

    console.log(" DISPLAY SKILLS:",skillsToBeDisplay);

    const skillContents = (
      <ul>
        {skillsToBeDisplay.map((skill) => (
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
          <CommonButton btnTitle="Add New Skill" onClick={togglePopUp} />
        </div>
        <div>
         {popUpState && <Main title='Add New Skill' message='new skill added'/>}
        </div>
      </>
    );
  }
};

export default Skills;
