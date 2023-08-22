import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

// export function ListWithAvatar({ comments }) {
export function Notification({ contents, mode = "comments" }) {
  const handleScroll = (event) => {
    console.log("scrolling");
    event.stopPropagation();
  };
  const comments = [
    {
      id: 1,
      content: "便當好吃便當好吃便當好吃便當好吃便當好吃",
      created_at: "2023-03-23 23:10:21",
      poster: {
        id: 1,
        name: "Zaikuku",
        picture: "",
      },
    },
    {
      id: 2,
      content: "便當好吃",
      created_at: "2023-03-23 23:10:21",
      poster: {
        id: 1,
        name: "曾泊文",
        picture: "",
      },
    },
    {
      id: 3,
      content: "測試捲動",
      created_at: "2023-03-23 23:10:25",
      poster: {
        id: 1,
        name: "曾泊文",
        picture: "",
      },
    },
    {
      id: 4,
      content: "測試捲動",
      created_at: "2023-03-23 23:10:25",
      poster: {
        id: 1,
        name: "曾泊文",
        picture: "",
      },
    },
    {
      id: 5,
      content: "測試捲動",
      created_at: "2023-03-23 23:10:25",
      poster: {
        id: 1,
        name: "曾泊文",
        picture: "",
      },
    },
    {
      id: 6,
      content: "測試捲動",
      created_at: "2023-03-23 23:10:25",
      poster: {
        id: 1,
        name: "曾泊文",
        picture: "",
      },
    },
  ];

  const whichMode = (mode) => {
    if (mode === "comments") {
      return `/userProfile`;
    } else if (mode === "task_req") {
      return `/applicants`;
    } else if (mode === "task_accepted") {
      return `/applicants`;
    } else if (mode === "task_completed") {
      return `/task/${contents.task_id}`;
    } else {
      return null;
    }
  };

  const commentItems = comments?.map((comment) => (
    <Link href={whichMode(mode)} key={comment.id}>
      <ListItem>
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
            className="font-normal overflow-y whitespace-nowrap text-ellipsis"
          >
            {comment.content}
          </Typography>
        </div>
      </ListItem>
    </Link>
  ));

  return (
    <div className="w-full overflow-hidden max-h-[25vh]">
      <Typography variant="h4" color="blue-gray" className="text-left ml-4">
        New {mode}
      </Typography>
      <List className="overflow-auto max-h-[25vh] pb-12" onWheel={handleScroll}>
        {commentItems}
      </List>
    </div>
  );
}
