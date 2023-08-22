/* eslint-disable no-undef */
import useSWR from "swr";
import { useCookies } from "react-cookie";
import { fetcher } from "@/utils";

export default function useGetNotifications(userId = null) {
  if (userId === "") {
    userId = useCookies(["token"])[0].token?.user.id;
  }
  console.log("userId", userId);
  const apiDomain = process.env.API_URL;
  const url = userId ? `${apiDomain}/events/` : null;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return [data?.user, error, isLoading];
}
