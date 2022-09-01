import React, { useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import Notification from "../../utilities/UI/Notification";
import { AuthContext } from "../../Services/Authentication/AuthContext";

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

  console.log("match profile:", matchedProfile);

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

  if (allSkills) {
    console.log("skills data:", allSkills);
    console.log('matched skills:',matchedProfile.skills)
   // const competentSkills = allSkills.map((eachSkills, index) => matchedProfile.skills.includes(index) );

   // console.log("skilllsss:", competentSkills);
  }

/*   if (allSkills) {
    console.log("skills data:", allSkills);
    const competentSkills = allSkills.map((eachSkills, index) => {
      const matchedSkills = [];
      if (matchedProfile.skills.includes(index)) {
        matchedSkills.push(eachSkills);
      }
      return matchedSkills;
    });

    console.log("skilllsss:", competentSkills);
  } */

  return <></>;
};

export default Skills;
