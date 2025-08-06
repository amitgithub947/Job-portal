import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/jobslice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-600 font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-blue-800">Dream Jobs</span>
        </h1>
        <p>
          Find your dream job effortlessly with our innovative job portal!
          Whether you're a fresher or an experienced professional, we connect
          you to top companies and opportunities tailored to your skills. Start
          your journey towards success today, build your career, and achieve
          your goals with just a few clicks. Your success starts here!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-blue-800"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
