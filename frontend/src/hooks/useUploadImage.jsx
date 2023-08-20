/* eslint-disable no-undef */
import axios from "axios";

export default function useUploadImage(body, token) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/users/picture`;
  const fetchData = async () => {
    try {
      const header_config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(apiUrl, body, header_config);

      if (response.status === 200) {
        // console.log(response.data.data);
        window.location.reload();
        return response.data.data;
      }
      console.error("Error:", response.status);

      return response.status;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
      return error.response;
    }
  };

  return fetchData();
}
