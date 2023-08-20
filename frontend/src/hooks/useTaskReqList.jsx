/* eslint-disable no-undef */
import useSWR from "swr";
import { fetcher } from "@/utils";

export default function useTaskReqList(id) {
  const API = process.env.API_URL;
  const url = `${API}/task_req`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  if (isLoading || error) {
    return { post: null, isLoading };
  }
  console.log("data", data);
  return { task: data?.data?.task, isLoading };
}
