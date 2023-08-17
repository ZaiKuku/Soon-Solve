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
          sweetAlert("請輸入完整資料", "請重新輸入", "error");
        } else if (error.response.status === 403) {
          sweetAlert("Email 已被註冊", "請重新輸入", "error");
        } else if (error.response.status === 422) {
          sweetAlert("Email 或 密碼 格式錯誤", "請重新輸入", "error");
        } else {
          console.error("Error:", error);
          // eslint-disable-next-line no-alert
          sweetAlert("發生錯誤", "請稍後再試", "error");
        }

        // 處理錯誤
      }
    }
  };
  return fetchData();
}
