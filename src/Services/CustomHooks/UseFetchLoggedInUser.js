import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import Notification from "../../utilities/UI/Notification";

const UseFetchLoggedInUser = ( profiles ) => {

  const { loggedInEmail } = useContext(AuthContext);
  const [matchedProfile, setMatchedProfile] = useState(null);

  useEffect(() => {
    const user = profiles.allProfile.find((profile) => profile.Email === loggedInEmail);
    setMatchedProfile(user);
  }, [profiles, loggedInEmail, setMatchedProfile]);

  const notificationComponent = (
    <div className="notificationAlign">
      <Notification
        className
        status="loading"
        message="....please be patient"
        title="loading.................."
      />
    </div>
  );
  return { notificationComponent, matchedProfile };
};

export default UseFetchLoggedInUser;
