import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormControl from "../components/Form/FormControl";
import Card from "../utilities/card/Card";
import CommonHeader from "../utilities/commonHeader/CommonHeader";

const RegisterFormContainer = () => {
  const initialValues = {
    Employee_ID_Number: "",
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Date_of_Birth: null,
    Phone_Number: "",
    Address: "",
    Postal_Code: "",
    Qualification: "",
    total_Experience: "",
    Start_Date: null,
    End_Date: null,
    Type_of_Employee: "",
    Designation: "",
    Gender: "",
    Marital_Status: "",
  };

  const employeeTypeOptions = [
    { key: "permanent", value: "permanent" },
    { key: "temporary", value: "temporary" },
  ];

  const genderOptions = [
    { key: "male", value: "male" },
    { key: "female", value: "female" },
  ];

  const maritalStatusOptions = [
    { key: "married", value: "married" },
    { key: "unmarried", value: "unmarried" },
  ];

  const validationSchema = Yup.object({
    Employee_ID_Number: Yup.string().required("*required"),
    First_Name: Yup.string().required("*required"),
    Middle_Name: Yup.string().required("*required"),
    Last_Name: Yup.string().required("*required"),
    Date_of_Birth: Yup.date().required("*required").nullable(),
    Phone_Number: Yup.string().required("*required"),
    Address: Yup.string().required("*required"),
    Postal_Code: Yup.string().required("*required"),
    Qualification: Yup.string().required("*required"),
    total_Experience: Yup.string().required("*required"),
    Start_Date: Yup.date().required("*required").nullable(),
    End_Date: Yup.date().required("*required").nullable(),
    Type_of_Employee: Yup.string().required("*required"),
    Designation: Yup.string().required("*required"),
    Gender: Yup.string().required("*required"),
    Marital_Status: Yup.string().required("*required"),
  });

  const submitHandler = (formValues, onSubmitProps) => {
    console.log("registration:", formValues);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    console.log("date checking:", formValues);
  };

  return (
    <>
      <Card dynamicClass="center" differentBg>
        <CommonHeader header="Edit your profile" />
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <FormControl
                  control="input"
                  label="EmployeeId"
                  name="Employee_ID_Number"
                  type="text"
                />
                <FormControl
                  control="input"
                  label="FirstName"
                  name="First_Name"
                  type="text"
                />
                <FormControl
                  control="input"
                  label="MiddleName"
                  name="Middle_Name"
                  type="text"
                />
                <FormControl
                  control="input"
                  label="LastName"
                  name="Last_Name"
                  type="text"
                />
                <FormControl
                  control="date"
                  label="Date of Birth"
                  name="Date_of_Birth"
                />

                <FormControl
                  control="input"
                  label="Phone Number"
                  name="Phone_Number"
                  type="tel"
                />

                <FormControl
                  control="textarea"
                  label="Address"
                  name="Address"
                />
                <FormControl
                  control="input"
                  label="postalCode"
                  name="Postal_Code"
                />
                <FormControl
                  control="input"
                  label="Qualification"
                  name="Qualification"
                  type="text"
                />
                <FormControl
                  control="input"
                  label="totalExperience"
                  name="total_Experience"
                />
                <FormControl
                  control="date"
                  label="Start Date"
                  name="Start_Date"
                />
                <FormControl control="date" label="End Date" name="End_Date" />
                <FormControl
                  control="radio"
                  label="Type of Employee"
                  name="Type_of_Employee"
                  options={employeeTypeOptions}
                />
                <FormControl
                  control="input"
                  label="Designation"
                  name="Designation"
                  type="text"
                />
                <FormControl
                  control="radio"
                  label="Gender"
                  name="Gender"
                  options={genderOptions}
                />
                <FormControl
                  control="radio"
                  label="matial status"
                  name="Marital_Status"
                  options={maritalStatusOptions}
                />
                <div className="form-control">
                  <button
                    type="submit"
                    disabled={
                      !(formik.dirty && formik.isValid) || formik.isSubmitting
                    }
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "3px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </>
  );
};

export default RegisterFormContainer;
