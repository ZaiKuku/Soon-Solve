/* eslint-disable no-undef */
import axios from "axios";
import sweetAlert from "sweetalert";

export default function useSignUp(body) {
  const api = process.env.API_URL;
  const apiUrl = `${api}/users/signup`;

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response);
        // 處理獲得的資料
      } else {
        console.error("Error:", response.status);

        // 處理錯誤狀態
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          sweetAlert(
            "Please enter complete information",
            "Please try again",
            "error"
          );
        } else if (error.response.status === 403) {
          sweetAlert(
            "Email has already been registered",
            "Please try again",
            "error"
          );
        } else if (error.response.status === 422) {
          sweetAlert(
            "Invalid Email or Password format",
            "Please try again",
            "error"
          );
        } else {
          console.error("Error:", error);
          // eslint-disable-next-line no-alert
          sweetAlert("An error occurred", "Please try again later", "error");
        }

        // 處理錯誤
      }
    }
  };
  return fetchData();
}
