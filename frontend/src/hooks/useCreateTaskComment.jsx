/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";

const useCreateTaskComment = () => {
  const CreateTaskComment = async (task_poster_id, body, token) => {
    const api = process.env.API_URL;
    const apiUrl = `${api}/users/comment/${task_poster_id}`;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.post(apiUrl, body, config);
      return result.data;
    } catch (err) {
      console.error(err);
    }
  };

  return [CreateTaskComment];
};

export default useCreateTaskComment;
