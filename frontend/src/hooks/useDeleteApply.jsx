/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useDeleteApply(usertaskId, token) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/task_req/${usertaskId}`;
  console.log(apiUrl);
  const DeleteReq = async () => {
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response);
        return response.data;
      }
      console.error("Error:", response.status);
      return null;
      // 處理錯誤狀態
    } catch (error) {
      if (error.response) {
        sweetAlert("An error occurred", "Please try again later", "error");
      }

      return null;
    }
  };

  return [DeleteReq];
}
