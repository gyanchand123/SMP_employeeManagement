import React, { useContext, useState, useMemo,useReducer } from "react";
import classes from "./PopUp.module.scss";
import CommonButton from "../button/CommonButton";
import Card from "../card/Card";
import { PopUpContext } from "../../Services/PopUpContext/PopUpContext";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormControl from "../../components/Form/FormControl";
import UseFindMatchedProfileId from "../../Services/CustomHooks/UseFindMatchedProfileId";
import UseFetchLoggedInUser from "../../Services/CustomHooks/UseFetchLoggedInUser";
import UseHttp from "../../Services/CustomHooks/UseHttp";
 

const ModelOverLay = ({ title}) => {
  console.log('MODEL part 4')
  const { togglePopUp } = useContext(PopUpContext);
  const { allSkills } = useSelector((state) => state.skills);
  const [skillsOption, setSkillsOption] = useState([]);
  const profiles = useSelector((state) => state.profile);
  const {userId:matchedProfileId}  = UseFindMatchedProfileId();
  const { matchedProfile } = UseFetchLoggedInUser(profiles);
  const { isLoading, error, sendingRequest: sendTaskRequest } = UseHttp();
  
  useMemo(() => {
    const dropDownOptions = [{ key: "select a skill", value: "" }];
    const collectiveSkills = allSkills[0];

    Object.keys(collectiveSkills).forEach(key => {
      dropDownOptions.push({key:collectiveSkills[key], value:key})
    }); 
    console.log('dropdown:',dropDownOptions)
    setSkillsOption(dropDownOptions);
  }, [allSkills]);



  const validationSchema = Yup.object({
    selectOption: Yup.string().required("*required"),
  });

  console.log('MODEL part ERROR :4',error)

 /*  const loadingReducer = (state,action) => {
    if(action.type==='LOAD_ERROR')  return {isLoading:action.payload.loadVal, error:action.payload.errorVal} 
    return state.intialLoadingState;
  }

  const [putLoadErrorState,dispatchLoading]  = useReducer(loadingReducer,{
    isLoading:false,
    error:null
  }); */
  
  const addNewSkillTaskHandler = async (matchedProfileId,duplicateProfile) => {
    console.log('inside api')
    sendTaskRequest(
      {
        url: `https://react-http-a6eb6-default-rtdb.firebaseio.com/employeeDetails/employeeDetails/0/profile/${matchedProfileId}.json`,
        method: "PUT",
        body: JSON.stringify(duplicateProfile),
        headers: {
          "Content-Type": "application/json",
        },
      }   
    );
  };
 

  const updatingSkillsForUser = (selectedSkill) => {

    if(matchedProfile && selectedSkill) {
        const duplicateProfile = JSON.parse(JSON.stringify(matchedProfile));
       // console.log('clone:',JSON.parse(JSON.stringify(matchedProfile)));
        console.log('match',matchedProfile);
        const existingSkills = duplicateProfile.skills.includes(selectedSkill);
        console.log('level1')
        console.log('level1--',matchedProfileId)
        
        if(!existingSkills) {
          console.log('level2')
          console.log('level2--',matchedProfileId)
          console.log('level2--skill',duplicateProfile.skills)
          duplicateProfile.skills.push(selectedSkill);
          if(matchedProfileId||matchedProfileId===0) {
            
            console.log('level3')
            console.log('level3--',matchedProfileId);

         //   addNewSkillTaskHandler(matchedProfileId,duplicateProfile);      
          }  
        } else {
          alert('skill already exists!! Please select a different skill');
        }
    }  
  }

  const onSubmit = (values) => {
    updatingSkillsForUser(+values.selectOption);
    if(!error) togglePopUp();
  };

  const selectFormContents = (<Formik initialValues={ {selectOption: ""}} 
                                     validationSchema={validationSchema} 
                                     onSubmit={onSubmit}>
                                <Form>
                                       <FormControl control='select' label='Select a Skill'
                                        name='selectOption' options={skillsOption}/>
                                       <footer className={classes.actions}>
                                          <CommonButton type='submit' btnTitle="Update Skill" />
                                       </footer>
                                </Form>
                                
                             </Formik>
                             );

  return (
    <Card skill={true} dynamicClass="center">
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        {selectFormContents}
      </div>  
      {isLoading && <span>loading......</span>}
      {error && <span>{error}......</span>}
    </Card>
  );
};

export default ModelOverLay;
