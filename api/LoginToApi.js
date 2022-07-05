import axios from "axios";
import { Alert } from "react-native";
import BaseUrl from "./BaseUrl";

const LoginToApi = async (user, segment) => {
  const loginUrl = BaseUrl + segment;
  const bodyString = JSON.stringify(user);
  const response = await axios
    .post(loginUrl, bodyString, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000,
      timeoutErrorMessage:
        "Connection to server could not be established!\nPlease check your internet connectivity.",
    })
    .catch(function (error) {
      const ex = error.toJSON();
      Alert.alert("LOGIN ERROR", ex.message);
    });
  return response;
};

export default LoginToApi;
