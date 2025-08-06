import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantTable from "./ApplicantTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/Redux/applicationSlice";

const Applicants = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicant = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${param.id}/applicants`,
          { withCredentials: true }
        );
        // console.log(res.data);

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicant();
  });
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantTable />
      </div>
    </div>
  );
};

export default Applicants;
