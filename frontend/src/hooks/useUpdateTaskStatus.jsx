/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useUpdateTaskUpStatus() {
  const api = process.env.API_URL;

  const updateTaskStatus = async (status, taskId, token) => {
    const apiUrl = `${api}/tasks/${status}/${taskId}`;
    try {
      const response = await axios.put(
        apiUrl,
        {},
        {
          // Passing null because no request body is required
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data.data.task;
      }
      console.error("Error:", response.status);
      return null;
    } catch (error) {
      if (error.response) {
        sweetAlert("An error occurred", "Please try again later", "error");
      }
      return null;
    }
  };

  return updateTaskStatus;
}
