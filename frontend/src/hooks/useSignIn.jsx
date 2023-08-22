/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useLogin(body) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/users/signin`;

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, body);

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
        if (error.response.status === 400) {
          sweetAlert(
            "Email or Password incorrect",
            "Please try again",
            "error"
          );
        } else if (error.response.status === 422) {
          sweetAlert(
            "Invalid Email or Password format",
            "Please try again",
            "error"
          );
        } else if (error.response.status === 403) {
          sweetAlert(
            "Email or Password incorrect",
            "Please try again",
            "error"
          );
        } else {
          sweetAlert("An error occurred", "Please try again later", "error");
          console.error("Error:", error);
        }

        // 處理錯誤
      }
      return null;
    }
  };

  return fetchData();
}
