import axios from "../../axios";

export const apiGetMe = () =>
  axios({
    url: "/user/me",
    method: "get",
  });
