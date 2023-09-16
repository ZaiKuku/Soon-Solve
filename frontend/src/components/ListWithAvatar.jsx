import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ExpandedComment } from "./ExpandedComment";

export function ListWithAvatar({ comments }) {
  const [fullComment, setFullCommet] = useState(false);
  const handleScroll = (event) => {
    console.log("scrolling");
    event.stopPropagation();
  };

  const commentItems = comments?.map((comment) => (
    <ListItem onClick={() => setFullCommet(comment)} key={comment.poster.id}>
      <ListItemPrefix>
        <Avatar
          variant="circular"
          alt="candice"
          src={comment.poster?.picture || "/profile.png"}
          className="shrink-0"
        />
      </ListItemPrefix>
      <div className="w-4/5">
        <Typography variant="h6" color="blue-gray">
          {comment.poster.name}
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {comment.content}
        </Typography>
      </div>
    </ListItem>
  ));

  return (
    <Card className="w-full overflow-hidden max-h-[30vh]">
      <Typography variant="h5" color="blue-gray" className="text-left ml-4">
        Comments
      </Typography>
      <ExpandedComment comment={fullComment} setCommet={setFullCommet} />
      <List className="overflow-auto" onWheel={handleScroll}>
        {commentItems}
      </List>
    </Card>
  );
}
