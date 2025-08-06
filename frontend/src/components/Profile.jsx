import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./Jobs/AppliedJobTable";
import UpdateProfileDialog from "./Jobs/UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/Redux/store";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

// const skills = [1, 2, 3, 4, 5];
const isresume = true;


const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <Navbar />
      <div className="max-w-7xl-mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="right">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-5 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-5 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-4">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isresume ? (
           <a
           target="_blank"
           rel="noopener noreferrer"
           href={user?.profile?.resume}
           className="text-blue-500 hover:underline"
         >
           {user?.profile?.resumeOriginalName}
         </a>
         
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold my-3 text-lg mx-auto">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Render UpdateProfileDialog only when open is true */}
      {open && <UpdateProfileDialog open={open} setopen={setOpen} />}
    </div>
  );
};

export default Profile;
