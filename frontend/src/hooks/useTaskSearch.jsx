/* eslint-disable no-undef */
import axios from "axios";
import { useCookies } from "react-cookie";

export default function useTaskSearch() {
  const [cookies] = useCookies(["token"]);
  let thereIsCondition = false;

  const sexProcess = (sex) => {
    if (sex === "男") {
      return 0;
    } else if (sex === "女") {
      return 1;
    } else if (sex === "其他") {
      return 2;
    }
    return null;
  };

  const apiProcess = (mode = "", cursor = 0, conditions = null) => {
    let api = process.env.API_URL;
    let apiUrl = `${api}/tasks/search?`;
    if (!conditions) {
      if (mode === "cursor") {
        return (apiUrl += `cursor=${cursor}`);
      }
      return `${api}/tasks/search`;
    }

    const { selectedLocations, sex, friend, title, num } = conditions;
    console.log(selectedLocations);
    const sexNum = sexProcess(sex);
    if (selectedLocations.length >= 1) {
      apiUrl += `location=${selectedLocations}`;
      thereIsCondition = true;
    }

    if (sexNum) {
      if (thereIsCondition) {
        apiUrl += "&";
      }
      // console.log("sexNum", sexNum);
      apiUrl += `sex=${sexNum}`;
    }
    if (friend) {
      if (thereIsCondition) {
        apiUrl += "&";
      }
      apiUrl += `friend=${friend}`;
      thereIsCondition = true;
    }

    if (num < 1) {
      apiUrl = `${api}/tasks/search`;
    }
    console.log("title", title);
    if (title) {
      if (thereIsCondition) {
        apiUrl += "&";
      } else if (num < 1) {
        apiUrl += "?";
      }
      apiUrl += `title=${title}`;
      thereIsCondition = true;
    }

    if (mode === "cursor") {
      if (thereIsCondition) {
        apiUrl += "&";
      } else {
        apiUrl += "?";
      }
      apiUrl += `cursor=${cursor}`;
    }

    thereIsCondition = false;

    return apiUrl;
  };

  const fetchData = async (mode = "", cursor = 0, conditions) => {
    if (mode === "cursor" && !cursor) {
      return;
    }
    const apiUrl = apiProcess(mode, cursor, conditions);

    try {
      const header_config = {
        headers: {
          Authorization: `Bearer ${cookies.token.access_token}`,
        },
      };
      console.log("apiUrl", apiUrl);
      const response = await axios.get(apiUrl, header_config);

      if (response.status === 200) {
        // eslint-disable-next-line consistent-return
        return [response?.data.data.tasks, response?.data.data.next_cursor];
      }
      console.error("Error:", response.status);
      // 處理錯誤狀態
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return [fetchData];
}

// if (isFirstPage) {
//   return location
//     ? `${API}/tasks/search?location=${location}`
//     : `${API}/tasks/search`;
// }

// const hasNextPage = previousPageData && nextCursor;
// if (hasNextPage) {
//   return location
//     ? `${API}/tasks/search?location=${location}&cursor='${nextCursor}'`
//     : `${API}/tasks/search?cursor='${nextCursor}'`;
// }
