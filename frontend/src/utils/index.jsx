import { getCookie } from "cookies-next";

export async function fetcher(url) {
  console.log(getCookie("token"));
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  if (res.status === 403) {
    throw new Error();
  }

  const data = await res.json();
  return data;
}
