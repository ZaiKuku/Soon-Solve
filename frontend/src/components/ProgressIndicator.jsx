import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function ProgressIndicator({ createdAt, deadline }) {
  // Convert to Date objects
  const createdAtDate = new Date(createdAt);
  const currentDateTime = new Date();
  const deadlineDate = new Date(deadline);

  // Calculate durations
  const totalDuration = deadlineDate - createdAtDate;
  const elapsedDuration = currentDateTime - createdAtDate;

  // Calculate percentage progress
  const progressPercentage = 100 - (elapsedDuration / totalDuration) * 100;

  return (
    <CircularProgress
      variant="determinate"
      value={progressPercentage}
      style={{
        color: "rgba(177, 94, 108, 1)",
        width: "140px",
        height: "140px",
      }}
      thickness={2}
    />
  );
}

export default ProgressIndicator;
