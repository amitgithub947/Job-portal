import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/Redux/companySlice";
import { toast } from "sonner";

const CompaniesCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [CompanyName,SetCompanyName] = useState();
    const registerNewCompany = async()=>{
        try {
          // console.log("A  ",CompanyName)
          
            const res = await axios.post(`${COMPANY_API_END_POINT}/register/`,{CompanyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });

            // console.log("ress  ", res);
            if(res.data.success){
                dispatch(setSingleCompany(res.data.message));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name?you can change this
            later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Type Your Company Name..."
          onChange={(e)=>SetCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="default"
            className="bg-red-600 hover:bg-red-500 text-white"
           onClick={()=>navigate("/admin/companies")} >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCreate;
