import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ListWithAvatar } from "./ListWithAvatar";
import { useState } from "react";
import UploadImage from "./UploadImage";

export function ProfileCard({ profileData }) {
  console.log("profileData", profileData);
  const credit_score = 100;
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  console.log("isEditingAvatar", isEditingAvatar);

  return (
    <Card className="w-96 border-[#B15E6C] border-2 flex items-center ">
      <CardHeader
        floated={false}
        className="hover:opacity-80 flex align-items w-4/5 m-h-56"
      >
        <div className="flex justify-center m-h-50 w-full">
          {isEditingAvatar ? (
            <UploadImage func={setIsEditingAvatar} />
          ) : (
            <button
              onClick={() => setIsEditingAvatar(!isEditingAvatar)}
              type="button"
              className="w-full m-h-40 flex justify-center items-center"
            >
              <img
                src={
                  profileData?.picture ? profileData?.picture : "/山道猴子.png"
                }
                alt="profile-picture"
                className="object-cover "
              />
            </button>
          )}
        </div>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {profileData?.name}
        </Typography>
        <Typography variant="h6" color="blue-gray">
          Credit Score{" "}
          <span
            className={credit_score >= 95 ? "text-green-200" : "text-red-200"}
          >
            {credit_score}
          </span>
        </Typography>
      </CardBody>

      <ListWithAvatar comments={profileData?.comment} />
    </Card>
  );
}
