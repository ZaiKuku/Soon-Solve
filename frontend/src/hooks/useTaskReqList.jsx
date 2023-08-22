/* eslint-disable no-undef */
import axios from "axios";
import { useCookies } from "react-cookie";

export default function useTaskReqList() {
  const [cookies] = useCookies(["token"]);

  const apiProcess = (mode = "", cursor = 0) => {
    let api = process.env.API_URL;
    let apiUrl = `${api}/task_req`;

    if (mode === "cursor") {
      apiUrl += `?cursor=${cursor}`;
    }

    return apiUrl;
  };

  const fetchData = async (mode = "", cursor = 0, conditions) => {
    console.log("Fetch data called with mode:", mode, "and cursor:", cursor);
    if (mode === "cursor" && !cursor) {
      console.log("Condition met: mode is 'cursor' and cursor is falsy");
      return [null, null];
    }
    const apiUrl = apiProcess(mode, cursor, conditions);
    try {
      const header_config = {
        headers: {
          Authorization: `Bearer ${cookies.token.access_token}`,
        },
      };
      console.log("apiUrl", apiUrl);
      const response = await axios.get(apiUrl, header_config);
      console.log("API Response:", response);
      if (response.status === 200) {
        // eslint-disable-next-line consistent-return
        const users = response?.data.data.users;
        const nextCursor = response?.data.data.next_cursor;
        console.log("Extracted users:", users, "and nextCursor:", nextCursor);
        return [users, nextCursor];
      }
      console.error("Error:", response.status);
      // 處理錯誤狀態
      return [null, null];
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
      return [null, null];
    }
  };

  return [fetchData];
}
