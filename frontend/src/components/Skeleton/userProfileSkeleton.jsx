import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ListWithAvatar } from "../ListWithAvatar";

import { Skeleton } from "@mui/material";

export function ProfileCardSkeleton() {
  return (
    <Card className="w-96 border-[#B15E6C] border-2 flex items-center ">
      <CardHeader
        floated={false}
        className="hover:opacity-80 flex align-items w-4/5 m-h-56"
      >
        <div className="flex justify-center m-h-50 w-full">
          <Skeleton variant="rectangular" width={320} height={200} />
        </div>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          <Skeleton variant="text" sx={{ fontSize: "44px" }} width={100} />
        </Typography>
        <Typography variant="h6" color="blue-gray">
          Credit Score{" "}
        </Typography>
      </CardBody>
    </Card>
  );
}
