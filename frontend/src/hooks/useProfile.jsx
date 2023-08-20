/* eslint-disable no-undef */
import useSWR from "swr";
import { useCookies } from "react-cookie";
import { fetcher } from "@/utils";

export default function useProfile(userId = null) {
  if (userId === "") {
    userId = useCookies(["token"])[0].token?.user.id;
  }
  console.log("userId", userId);
  const apiDomain = process.env.API_URL;
  const url = userId ? `${apiDomain}/users/${userId}/profile` : null;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return null;
  }
  console.log("data", data);
  return data?.user;
}
