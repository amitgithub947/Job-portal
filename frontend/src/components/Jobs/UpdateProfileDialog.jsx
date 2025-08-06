import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/Redux/authslice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setopen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: user?.profile?.resume || null,
  });
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    if (e.target.name === "file") {
      setInput({ ...input, file: e.target.files[0] });
      console.log("REsume", e.target.files[0])
      console.log("user", user)
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const submitHandler =async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname)||"";
    formData.append("email", input.email)||"";
    formData.append("phoneNumber", input.phoneNumber)||"";
    formData.append("bio", input.bio)||"";
    formData.append("skills", input.skills)||"";
    if (input.file) {
        formData.append("file", input.file);
    }
    setloading(true);
    try {
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        })

        // console.log("res", res)
        if(res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
    }
    setloading(false);
    console.log(input);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-5">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input
                id="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
                name="fullname"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
                name="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Number
              </Label>
              <Input
                id="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
                name="phoneNumber"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
                name="bio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
                name="skills"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                className="col-span-3"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={changeEventHandler}
              />
            </div>
          </div>
          <DialogFooter>
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
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
