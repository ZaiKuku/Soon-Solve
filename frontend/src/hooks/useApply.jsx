/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useApply(body, taskId, token) {
  const api = process.env.API_URL;
  // const apiUrl = `${api}//task_req/${taskId}/request`;
  const apiUrl = `${api}/task_req/${taskId}/request`;
  console.log(apiUrl);
  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log(response.data);

        // 處理獲得的資料
        return response.data;
      }
      console.error("Error:", response.status);
      return null;
      // 處理錯誤狀態
    } catch (error) {
      if (error.response) {
        sweetAlert("發生錯誤", "請稍後再試", "error");
      }
      return null;
    }
  };

  return fetchData();
}
