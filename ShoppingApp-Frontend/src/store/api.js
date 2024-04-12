import axios from "axios";

//import { Auth } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    try {
      //const access_token = await Auth.currentSession();
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

      console.log("access_token : ", accessToken, idToken);
      if (idToken) {
        config.headers["Authorization"] = idToken;
      }
    } catch (err) {
      console.log("are you signed in? " + err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
