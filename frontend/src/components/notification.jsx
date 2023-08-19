// import Image from "next/image";
// import styles from "../styles/notification.module.scss";

// function Notification() {
//   return (
//     <div className={styles.notificationContainer}>
//       <div>
//         <Image
//           src="/profile.png"
//           width={50}
//           height={50}
//           className="rounded-full shrink-0 object-cover"
//         />
//       </div>
//       <div className={styles.notificationBox}>
//         <div className={styles.notification}>
//           yoyoyoyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyyoyoyoyoyoyoyoyoyoyoyoyoyoyo
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notification;
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

// export function ListWithAvatar({ comments }) {
export function ListWithAvatar() {
  const [fullComment, setFullCommet] = useState(false);
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
        name: "曾泊文",
        picture: "https://schoolvoyage.ga/images/123498.png",
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
  ];
  const commentItems = comments?.map((comment) => (
    <ListItem onClick={() => setFullCommet(comment)} key={comment.id}>
      <ListItemPrefix>
        <Avatar
          variant="circular"
          alt="candice"
          src={comment.poster?.picture || "/山道猴子.png"}
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
    <div className="w-full overflow-hidden max-h-[30vh]">
      <Typography variant="h5" color="blue-gray" className="text-left ml-4">
        Notifications
      </Typography>
      <List className="overflow-auto" onWheel={handleScroll}>
        {commentItems}
      </List>
    </div>
  );
}
