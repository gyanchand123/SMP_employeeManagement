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

  const { togglePopUp } = useContext(PopUpContext);
  const { allSkills } = useSelector((state) => state.skills);
  const [skillsOption, setSkillsOption] = useState([]);
  const profiles = useSelector((state) => state.profile);
  const {userId:matchedProfileId}  = UseFindMatchedProfileId();
  const { matchedProfile } = UseFetchLoggedInUser(profiles);
  
  useMemo(() => {
    const dropDownOptions = [{ key: "select a skill", value: "" }];
    allSkills[0].forEach((skill, index) =>
      dropDownOptions.push({ key:skill , value: index })
    );
    setSkillsOption(dropDownOptions);
  }, [allSkills]);

 

  const loadingReducer = (state,action) => {
    if(action.type==='LOAD_ERROR')  return {isLoading:action.payload.loadVal, error:action.payload.errorVal} 
    return state.intialLoadingState;
  }

  const [putLoadErrorState,dispatchLoading]  = useReducer(loadingReducer,{
    isLoading:false,
    error:null
  });
 
  const validationSchema = Yup.object({
    selectOption: Yup.string().required("*required"),
  });

  const updatingSkillsForUser = (selectedSkill) => {

    if(matchedProfile && selectedSkill) {
        const duplicateProfile = JSON.parse(JSON.stringify(matchedProfile));
        const existingSkills = duplicateProfile.skills.includes(selectedSkill);
        console.log('level1')
        console.log('level1--',matchedProfileId)
        
        if(!existingSkills) {
          console.log('level2')
          console.log('level2--',matchedProfileId)
          duplicateProfile.skills.push(selectedSkill);
          if(matchedProfileId||matchedProfileId===0) {
            
            console.log('level3')
            console.log('level3--',matchedProfileId);

            const { isLoading, error, sendingRequest: sendTaskRequest } = UseHttp();

            const enterTaskHandler = async (taskText) => {
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
            enterTaskHandler();
            dispatchLoading({type:'LOAD_ERROR',payload:{loadVal:isLoading,errorVal:error}});          
          }  
        } else {
          alert('skill already exists!! Please select a different skill');
        }
    }  
  }

  const onSubmit = (values) => {
    updatingSkillsForUser(+values.selectOption);
   // if(!putLoadErrorState.isLoading || !putLoadErrorState.error) togglePopUp();
    if(!putLoadErrorState.error) togglePopUp();
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
      {putLoadErrorState.isLoading && <span>loading......</span>}
      {putLoadErrorState.error && <span>{putLoadErrorState.error}......</span>}
    </Card>
  );
};

export default ModelOverLay;
