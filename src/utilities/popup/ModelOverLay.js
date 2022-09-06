import React, { useContext, useState, useMemo } from "react";
import classes from "./PopUp.module.scss";
import CommonButton from "../button/CommonButton";
import Card from "../card/Card";
import { PopUpContext } from "../../Services/PopUpContext/PopUpContext";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormControl from "../../components/Form/FormControl";

const ModelOverLay = ({ title, message }) => {
  const { togglePopUp } = useContext(PopUpContext);
  const { isfetchingStatus, allSkills } = useSelector((state) => state.skills);
  const [skillsOption, setSkillsOption] = useState([]);

  useMemo(() => {
    const dropDownOptions = [{ key: "select a skill", value: "" }];
    allSkills[0].forEach((skill, index) =>
      dropDownOptions.push({ key:skill , value: index })
    );
    setSkillsOption(dropDownOptions);
  }, [allSkills]);

  const initialValues = {
    selectOption: "",
  };

  const validationSchema = Yup.object({
    selectOption: Yup.string().required("*required"),
  });

  const onSubmit = (values) => {
    console.log("selected skills options:", values);
  };

  const selectFormContents = (<Formik initialValues={initialValues} 
                                     validationSchema={validationSchema} 
                                     onSubmit={onSubmit}>
                                <Form>
                                       <FormControl control='select' label='Select a Skill'
                                        name='selectOption' options={skillsOption}/>
                                </Form>

                             </Formik>);

  return (
    <Card skill={true} dynamicClass="center">
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        {selectFormContents}
      </div>
      <footer className={classes.actions}>
        <CommonButton onClick={togglePopUp} btnTitle="Update Skill" />
      </footer>
    </Card>
  );
};

export default ModelOverLay;
