// useTaskDelete.js
/* eslint-disable no-undef */
import { useState } from "react";
import axios from "axios";

export default function useTaskDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [task, setTask] = useState(null);

  const deleteTask = async (taskId, token) => {
    const api = process.env.API_URL;
    // Construct the API URL
    const apiUrl = `${api}/tasks/${taskId}`;

    // Set initial state
    setIsLoading(true);
    setError(null);

    try {
      // Send the DELETE request to the API
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for successful response
      if (response.status === 200) {
        // Update state with the response data
        setTask(response.data.data.task);
      } else {
        // Handle non-200 status codes
        setError(`Error: ${response.status}`);
      }
    } catch (err) {
      // Handle errors during the request
      setError(err.message);
    } finally {
      // Update loading state
      setIsLoading(false);
    }
  };

  return { deleteTask, isLoading, error, task };
}
