/* eslint-disable no-undef */
import useSWR from "swr";
import { fetcher } from "@/utils";

export default function useTaskDetails(id) {
  const API = process.env.API_URL;
  const url = `${API}/tasks/${id}`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  if (isLoading || error) {
    return { post: null, isLoading };
  }

  return { post: data?.data?.task, isLoading };
}
