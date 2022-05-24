import axios from "axios";
import { Alert } from "react-native";
import BaseUrl from "./BaseUrl";

const LoginToApi = async (user, segment) => {
  const loginUrl = BaseUrl + segment;
  const bodyString = JSON.stringify(user);
  const response = axios
    .post(loginUrl, bodyString, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res?.data;
    });
  return response;
};

export default LoginToApi;
