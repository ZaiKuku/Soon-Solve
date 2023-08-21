/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const useCreateTask = (data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const api = process.env.API_URL;
  const apiUrl = `${api}/tasks`;
  console.log(data);
  useEffect(() => {
    const createTask = async () => {
      try {
        setIsLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        };
        const result = await axios.post(apiUrl, data, config);
        setResponse(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    createTask();
  }, [data]);

  return { response, error, isLoading };
};

export default useCreateTask;
