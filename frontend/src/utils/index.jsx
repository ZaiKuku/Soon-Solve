import { getCookie } from "cookies-next";

export async function fetcher(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(getCookie("token")).access_token}`,
    },
  });

  if (res.status === 403) {
    throw new Error();
  }

  const data = await res.json();
  return data;
}

export function convertGenderInObject(obj) {
  for (const key in obj) {
    if (obj[key] === "男") {
      obj[key] = 1;
    } else if (obj[key] === "女") {
      obj[key] = 2;
    }
  }
  return obj;
}

// const socket = io("ws://example.com/my-namespace", {
//   reconnectionDelayMax: 10000,
//   auth: {
//     token: "123",
//   },
//   query: {
//     "my-key": "my-value",
//   },
// });
