import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ListWithAvatar } from "./ListWithAvatar";
import { useState } from "react";
import UploadImage from "./UploadImage";
import { setIsLoadingProfile } from "@/redux/LoadingControl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

export function ProfileCard({ profileData }) {
  console.log("profileData", profileData);
  const dispatch = useDispatch();
  const credit_score = 100;
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  console.log("isEditingAvatar", isEditingAvatar);
  const isLoading = profileData ? false : true;
  const isLoadingProfile = useSelector(
    (state) => state.LoadingControl.isLoadingProfile
  );

  useEffect(() => {
    dispatch(setIsLoadingProfile(isLoading));
  }, [isLoading]);

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
              {!isLoadingProfile ? (
                <img
                  src={profileData?.picture || "/bigprofile.png"}
                  alt="profile-picture"
                  className="object-cover "
                />
              ) : (
                <Skeleton variant="rectangular" width={320} height={200} />
              )}
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
