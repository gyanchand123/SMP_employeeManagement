import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";
import CommonButton from "../../utilities/button/CommonButton"; 
import UseFetchLoggedInUser from "../../Services/CustomHooks/UseFetchLoggedInUser";


const EmployeeDetail = () => {
  
  console.log("inside EmployeeDetail");  
  const navigate = useNavigate();
  const profiles = useSelector(state => state.profile);
  const {notificationComponent,matchedProfile} = UseFetchLoggedInUser(profiles);

  if (profiles.isDataFetching) return notificationComponent;

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("registration", { replace: true });
  };
 
    if (profiles && matchedProfile) {
    const {
      Employee_ID_Number,
      First_Name,
      Last_Name,
      Middle_Name,
      Date_of_Birth,
      Phone_Number,
      Address,
      Postal_Code,
      Qualification,
      total_Experience,
      Type_of_Employee,
      Designation,
      Gender,
      Marital_Status,
    } = {...matchedProfile,Date_of_Birth: new Date(matchedProfile.Date_of_Birth).toLocaleDateString('en-US')};

    return (
      <Card dynamicClass='center'>
        <CommonHeader header='Employee Bio Data'/>          
        <table>
          <tbody>
            <tr>
              <th>Employee-id :</th>
              <td> {Employee_ID_Number}</td>
            </tr>
            <tr>
              <th>Name :</th>
              <td>
                <span>{First_Name}</span>
                <span>{Middle_Name}</span>
                <span>{Last_Name}</span>
              </td>
            </tr>
            <tr>
              <th>DOB : </th>
              <td>{Date_of_Birth}</td>
            </tr>
            <tr>
              <th>ContactNumber:</th>
              <td>{Phone_Number}</td>
            </tr>
            <tr>
              <th>Address :</th>
              <td>{Address}</td>
            </tr>
            <tr>
              <th>Postal Code :</th>
              <td>{Postal_Code}</td>
            </tr>
            <tr>
              <th>Qualification :</th>
              <td>{Qualification}</td>
            </tr>
            <tr>
              <th>TotalExperience:</th>
              <td>{total_Experience}</td>
            </tr>
            <tr>
              <th>Employee Type :</th>
              <td>{Type_of_Employee}</td>
            </tr>
            <tr>
              <th>Designation :</th>
              <td>{Designation}</td>
            </tr>
            <tr>
              <th>Gender : </th>
              <td>{Gender}</td>
            </tr>
            <tr>
              <th>Marital_Status</th>
              <td>{Marital_Status}</td>
            </tr>
          </tbody>
        </table>
        <CommonButton type="button"  onClick={handleEdit} btnTitle='Edit' btn_type='edit_del' />        
      </Card>
    );
  } 
  

};

export default React.memo(EmployeeDetail);
