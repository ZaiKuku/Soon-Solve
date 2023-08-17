/* eslint-disable no-undef */
import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import { fetcher } from "@/utils";

export default function useTaskRecord(type = "Released") {
  const API = process.env.API;
  const [isEnd, setIsEnd] = useState(false);

  function getURL(pageIndex, previousPageData) {
    const nextCursor = previousPageData?.data?.next_cursor;

    const isFirstPage = pageIndex === 0;
    if (isFirstPage) {
      if (type === "Released") {
        return `${API}/users/${type}/task_records`;
      }
    }

    const hasNextPage = previousPageData && nextCursor;
    if (hasNextPage) {
      return `${API}/users/${type}/task_records?cursor='${nextCursor}'`;
    }
    setIsEnd(true);

    return null;
  }

  const { mutate, data, error, isLoading, size, setSize } = useSWRInfinite(
    getURL,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateOnMount: true,
    }
  );

  if (isLoading || error) {
    return { mutate, isLoading, isEnd, size, setSize, tasks: [] };
  }

  const tasks = data?.map((d) => d.data.tasks).flat();
  return { mutate, isLoading, isEnd, size, setSize, tasks: tasks ?? [] };
}
