import axios from "axios";
import { Alert } from "react-native";
import BaseUrl from "./BaseUrl";

const PostToApi = async (token, segment, objectString, indicator) => {
  const endpoint = BaseUrl + segment;
  const response = await axios
    .post(endpoint, objectString, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      timeout: 120000,
      timeoutErrorMessage:
        "Your request has timed out.\nCheck your internet connectivity.",
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      const ex = error.toJSON();
      Alert.alert(`${indicator} SYNCH ERROR`, ex.message);
    });

  return response;
};

export default PostToApi;
