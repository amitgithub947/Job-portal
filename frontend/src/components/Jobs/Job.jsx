import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "hhxbcuhyhdnji";
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Date not available"; // Handle missing date

    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();

    const timediff = currentTime - createdAt; // Time difference in milliseconds
    const daysAgo = Math.floor(timediff / (1000 * 60 * 60 * 24)); // Convert to days

    return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-5 rounded-md shadow-xl bg-white border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm to-gray-500">
            {daysAgoFunction(job?.createdAt)}
          </p>

          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>
        <div className="flex item-center gap-2 my-2">
          <Button className="p-6" size="icon" variant="outline">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg ">{job?.company?.name}</h1>
            <p>India</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm to-gray-600">{job?.description}</p>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Badge className={"text-blue-600 font-bold"}>{job?.position} Position</Badge>
          <Badge className={"text-red-600 font-bold"}>{job?.jobType}</Badge>
          <Badge className={"text-purple-500 font-bold"}>{job?.salary} LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
          >
            Details
          </Button>
          <Button className="bg-blue-600">Save for Later</Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
