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
export const apiForgotPassword = (data: any) =>
  axios({
    url: "/auth/forgot-password",
    method: "POST",
    data,
  });
export const apiVerifyForgotPassword = (data: any) =>
  axios({
    url: "/auth/verify-forgot-password",
    method: "POST",
    data,
  });
export const apiResetPassword = (data: any) =>
  axios({
    url: "/auth/reset-password",
    method: "POST",
    data,
  });
