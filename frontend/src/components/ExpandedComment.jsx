import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  avatar,
} from "@material-tailwind/react";

export function ExpandedComment({ comment, setCommet }) {
  console.log(comment);
  const handleOpen = () => {
    setCommet("");
  };
  return (
    <Dialog open={comment} handler={handleOpen}>
      <DialogHeader className="gap-3">
        <Avatar
          variant="circular"
          alt="candice"
          src={comment.poster?.picture || "/山道猴子.png"}
        />
        {comment.poster?.name}
      </DialogHeader>
      <DialogBody divider>{comment.content || "loading"}</DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="deep-purple" onClick={handleOpen}>
          <span>back</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
