import axios from "axios";
import { Alert } from "react-native";
import BaseUrl from "./BaseUrl";

const GetFromApi = async (token, segment) => {
  const endpoint = segment;

  const response = await axios({
    method: "GET",
    url: BaseUrl + endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response?.data;
};

export default GetFromApi;
