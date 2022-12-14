import { useQuery } from "react-query";
import axios from 'axios'

const fetchingEmp_Project_Details = () => {
  return axios.get(
    "http://localhost:3000/employeeDetails"
  );
};

const UseFetchAllDetails = (onSuccess, onError) => {
  return useQuery("fetch_all_data", fetchingEmp_Project_Details, {
    onError,
    select: (data) => {
      const emp_details = data?.data;
      return emp_details;
    },
    onSuccess,
    cacheTime:300000,
    staleTime:300000,
     
  });
};

export default UseFetchAllDetails;
