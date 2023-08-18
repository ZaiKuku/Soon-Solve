/* eslint-disable no-undef */
import axios from "axios";
import { useCookies } from "react-cookie";

export default function useTaskSearch() {
  const [cookies] = useCookies(["token"]);

  const fetchData = async (mode = "", cursor = 0) => {
    if (mode === "cursor" && !cursor) {
      return;
    }
    const api = process.env.API_URL;
    let apiUrl;
    console.log("cursor", mode);
    if (mode === "cursor") {
      apiUrl = `${api}/tasks/search?cursor=${cursor}`;
    } else {
      apiUrl = `${api}/tasks/search`;
    }
    try {
      const header_config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      };
      const response = await axios.get(apiUrl, header_config);

      if (response.status === 200) {
        // eslint-disable-next-line consistent-return
        console.log(response.data);
        return [response?.data.data.tasks, response?.data.data.next_cursor];
      }
      console.error("Error:", response.status);
      // 處理錯誤狀態
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return [fetchData];
}

// if (isFirstPage) {
//   return location
//     ? `${API}/tasks/search?location=${location}`
//     : `${API}/tasks/search`;
// }

// const hasNextPage = previousPageData && nextCursor;
// if (hasNextPage) {
//   return location
//     ? `${API}/tasks/search?location=${location}&cursor='${nextCursor}'`
//     : `${API}/tasks/search?cursor='${nextCursor}'`;
// }
