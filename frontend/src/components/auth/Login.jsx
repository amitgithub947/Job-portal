import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // Assuming you are using `react-toastify` for toast notifications
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/Redux/authslice";
import store from "@/Redux/store";
import { Loader2 } from "lucide-react";
import SuccessMessage from "@/utils/successAlert";


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth);
  // Input change handler for email and password
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Radio button change handler for role
  const roleChangeHandler = (e) => {
    setInput({ ...input, role: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error("All fields are required.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        SuccessMessage(res.data.message)
        // toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
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
            Login
          </h1>
          <div className="space-y-4">
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
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Enter your email"
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
                name="password"
                value={input.password}
                onChange={changeEventHandler}
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
                  onChange={roleChangeHandler}
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
                  onChange={roleChangeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="text-sm text-gray-600">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
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
              Login
            </Button>
          )}
          {/* Submit Button */}

          <div className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
