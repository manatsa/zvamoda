import axios from "axios";
import BaseUrl from "./BaseUrl";

const PostToApi = async (token, segment, objectString) => {
  const endpoint = BaseUrl + segment;
  const response = axios
    .post(endpoint, objectString, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      //console.log(res);
      return res?.data;
    });

  return response;
};

export default PostToApi;
