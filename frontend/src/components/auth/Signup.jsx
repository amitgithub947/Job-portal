import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/Redux/store";
import { setLoading } from "@/Redux/authslice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const {loading,user}  = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event handler for text inputs
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Event handler for file input
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  // Form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !input.fullname ||
      !input.email ||
      !input.phoneNumber ||
      !input.password ||
      !input.role
    ) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }finally{
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto p-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-6"
        >
          <h1 className="font-bold text-2xl text-gray-700 mb-6 text-center">
            Sign Up
          </h1>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <Label
                htmlFor="full-name"
                className="text-sm font-medium text-gray-600"
              >
                Full Name
              </Label>
              <Input
                id="full-name"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                name="fullname"
                placeholder="Enter your full name"
                className="mt-1 w-full"
              />
            </div>
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-600"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full"
              />
            </div>
            {/* Phone Number */}
            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="text"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="mt-1 w-full"
              />
            </div>
            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={input.password}
                onChange={changeEventHandler}
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full"
              />
            </div>
          </div>

          {/* Radio Group */}
          <div className="mt-6">
            <Label className="text-sm font-medium text-gray-600">
              Choose Role
            </Label>
            <RadioGroup className="flex items-center gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="text-sm text-gray-600">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="text-sm text-gray-600">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* File Input */}
          <div className="mt-4">
            <Label htmlFor="file" className="text-sm font-medium text-gray-600">
              Profile Picture
            </Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer mt-2"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 2-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </Button>
          )}
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
