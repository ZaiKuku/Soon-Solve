import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { ListWithAvatar } from "./ListWithAvatar";

export function ProfileCard() {
  const credit_score = 100;
  return (
    <Card className="w-96 border-[#B15E6C] border-2">
      <CardHeader floated={false}>
        <img src="/山道猴子.png" alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          山道猴子
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

      <ListWithAvatar />
    </Card>
  );
}
