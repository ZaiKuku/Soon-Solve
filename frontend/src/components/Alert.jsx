import React from "react";
import { Alert, Button } from "@material-tailwind/react";

export function AlertCustomAnimation({ content = null }) {
  const [open, setOpen] = React.useState(content);

  return (
    <>
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {content}
      </Alert>
    </>
  );
}
