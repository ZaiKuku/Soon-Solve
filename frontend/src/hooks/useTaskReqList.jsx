/* eslint-disable no-undef */
import axios from "axios";
import { useCookies } from "react-cookie";

export default function useTaskReqList() {
  const [cookies] = useCookies(["token"]);

  const apiProcess = (mode = "", cursor = 0) => {
    let api = process.env.API_URL;
    let apiUrl = `${api}/tasks/search`;

    if (mode === "cursor") {
      apiUrl += "?";
      apiUrl += `cursor=${cursor}`;
    }

    return apiUrl;
  };

  const fetchData = async (mode = "", cursor = 0, conditions) => {
    if (mode === "cursor" && !cursor) {
      return;
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

      if (response.status === 200) {
        // eslint-disable-next-line consistent-return
        return [response?.data.data.users, response?.data.data.next_cursor];
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
