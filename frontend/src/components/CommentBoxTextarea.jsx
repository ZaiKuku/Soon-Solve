import { Textarea, Button } from "@material-tailwind/react";
import useTaskDetails from "@/hooks/useTaskDetails";
import useCreateTaskComment from "@/hooks/useCreateTaskComment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export function CommentBoxTextarea({ setOpen, taskId, takerId }) {
  const [comment, setComment] = useState("");

  const { task, isLoading } = useTaskDetails(parseInt(taskId, 10));
  const [cookies, setCookie] = useCookies(["token"]);
  const [CreateTaskComment] = useCreateTaskComment();
  const handleSubmit = async () => {
    const user_task_id = task.user_task.filter(
      (user_task) => user_task.taker_id === parseInt(takerId, 10)
    )[0].taker_id;

    const body = {
      content: comment,
    };
    console.log(user_task_id, body);
    try {
      await CreateTaskComment(user_task_id, body, cookies.token.access_token);
    } catch (err) {
      console.error(err);
    }

    setOpen(false);
  };

  return (
    <div className="relative w-[80vw] max-w-[359px]">
      <Textarea
        variant="static"
        placeholder="Leave Your Comment About The Task"
        rows={8}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex w-full justify-between py-1.5">
        <div className="flex gap-2">
          <Button
            size="sm"
            color="red"
            variant="text"
            className="rounded-md"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button size="sm" className="rounded-md" onClick={handleSubmit}>
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
