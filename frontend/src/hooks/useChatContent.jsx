/* eslint-disable no-undef */
import useSWR from "swr";
import { fetcher } from "@/utils";

export default function useChatContent(user_task_id) {
  const API = process.env.API_URL;
  const url = `${API}/chat/${user_task_id}`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  if (isLoading || error) {
    return { data: null, isLoading };
  }

  return { content: data.data.messages, isLoading };
}
