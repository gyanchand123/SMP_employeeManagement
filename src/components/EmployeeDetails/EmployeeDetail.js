import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Services/Authentication/AuthContext";
import Notification from "../../utilities/UI/Notification";
import Card from "../../utilities/card/Card";
import CommonHeader from "../../utilities/commonHeader/CommonHeader";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const profiles = useSelector((state) => state.profile);
  const { loggedInEmail } = useContext(AuthContext);

  const matchedProfile = useMemo(
    () =>
      profiles.allProfile.find((profile) => profile.Email === loggedInEmail),
    [profiles, loggedInEmail]
  );

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("registration", { replace: true });
  };

  if (profiles.isDataFetching) {
    console.log('employe detail fetching..')

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

  if (matchedProfile) {
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
    } = matchedProfile;

    console.log('inside employee details:',matchedProfile)

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

        <button type="button" onClick={handleEdit}>
          Edit
        </button>
      </Card>
    );
  }
};

export default React.memo(EmployeeDetail);
