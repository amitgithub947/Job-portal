import { setAllJobs } from "@/Redux/jobslice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "@/utils/ErrorMessage.js";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector(store=>store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        ErrorMessage("To see the Jobs You have to Login")
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
