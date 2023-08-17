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
          sweetAlert("Email 或 密碼 錯誤", "請重新輸入", "error");
        } else if (error.response.status === 422) {
          sweetAlert("Email 或 密碼 格式錯誤", "請重新輸入", "error");
        } else if (error.response.status === 403) {
          sweetAlert("Email 或 密碼 錯誤", "請重新輸入", "error");
        } else {
          sweetAlert("發生錯誤", "請稍後再試", "error");
          console.error("Error:", error);
        }

        // 處理錯誤
      }
      return null;
    }
  };

  return fetchData();
}
