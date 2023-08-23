/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useDeleteTask() {
  const DeleteTask = async (taskId, token) => {
    const api = process.env.API_URL;
    const apiUrl = `${api}/tasks/${taskId}`;
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
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

  return [DeleteTask];
}
