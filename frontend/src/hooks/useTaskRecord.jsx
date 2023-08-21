/* eslint-disable no-undef */
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useTaskRecord() {
  const [cookies] = useCookies(["user"]);

  const fetchTasks = async (mode = "", cursor = 0, type = "Released") => {
    if (mode === "cursor" && !cursor) {
      return;
    }

    const api = process.env.API_URL;
    let apiUrl = "";

    if (mode === "") {
      apiUrl = `${api}/users/${type}/task_records`;
    } else if (mode === "cursor") {
      apiUrl = `${api}/users/${type}/task_records?cursor=${cursor}`;
    }
    try {
      const header_config = {
        headers: {
          Authorization: `Bearer ${cookies.token.access_token}`,
        },
      };
      const response = await axios.get(apiUrl, header_config);

      if (response.status === 200) {
        // eslint-disable-next-line consistent-return
        return [response?.data?.data?.task, response?.data?.data?.next_cursor];
      }
      console.error("Error:", response.status);
      // 處理錯誤狀態
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return [fetchTasks];
}
