import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // ✅ Use useSelector at the top
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import useGetCompanyByid from "@/hooks/useGetCompanyByid";

const CompanySetup = () => {
  // ✅ Get singleCompany from Redux store at the top
  const { singleCompany } = useSelector((state) => state.company);

  const [input, SetInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useGetCompanyByid(params.id);
  useEffect(() => {
    if (singleCompany) {
      SetInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,  // File can't be directly prefilled
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    SetInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    SetInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Validate input before submitting
    if (!input.name.trim() || !input.description.trim() || !input.website.trim() || !input.location.trim()) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={submitHandler}>
          {/* Header Section */}
          <div className="flex items-center gap-5 border-b pb-5 mb-5">
            <Button
              variant="outline"
              className="flex items-center text-gray-600 font-semibold hover:text-gray-900"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span className="ml-2">Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-gray-700">Description</Label>
              <Input
                type="text"
                name="description"
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-gray-700">Website</Label>
              <Input
                type="text"
                name="website"
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-gray-700">Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              className="w-full mt-6 flex items-center justify-center bg-gray-400 text-white font-medium py-2 rounded-lg cursor-not-allowed"
              disabled
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
