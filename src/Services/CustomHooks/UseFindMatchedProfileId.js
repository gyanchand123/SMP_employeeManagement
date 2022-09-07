import {useMemo,useState} from 'react';
import { useSelector } from "react-redux";

const UseFindMatchedProfileId = () => {

    const {allProfile}  = useSelector(state => state.profile);
    const loggedInUserMail = localStorage.getItem('logInEmail');
    const [userId,setUserId] = useState(null);
    
  useMemo(()=> {
    const matchProfileId = allProfile.findIndex(profile => profile.Email===loggedInUserMail);  
    setUserId(matchProfileId);
  },[allProfile, loggedInUserMail, setUserId])


  return {userId};
}

export default UseFindMatchedProfileId;