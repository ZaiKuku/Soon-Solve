/* eslint-disable no-undef */
import axios from "axios";

export default function useTaskReqFinish() {
  const FinishReq = async (token, status, user_task_id) => {
    const api = process.env.API_URL;
    const apiUrl = `${api}/task_req/update/${status}/${user_task_id}`;
    try {
      const response = await axios.put(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
      console.error("Error:", response.status);
      return null;
      // 處理錯誤狀態
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
      return null;
    }
  };

  return [FinishReq];
}
