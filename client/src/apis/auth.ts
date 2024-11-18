import axios from "../../axios";

export const apiSignUp = (data: any) =>
  axios({
    url: "/auth/sign-up",
    method: "POST",
    data,
  });
export const apiSignIn = (data: any) =>
  axios({
    url: "/auth/sign-in",
    method: "POST",
    data,
  });
