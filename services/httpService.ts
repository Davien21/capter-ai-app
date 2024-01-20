import axios, { AxiosError } from "axios";
import toaster from "./toastService";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  // const weirdMsgs = ["resource not found", "try again"];
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    const message: string = error.response?.data?.message || error.message;
    if (message.toLowerCase().includes("try again")) return;
    // if (weirdMsgs.some((msg) => message.toLowerCase().includes(msg))) return;
    toaster.error("An unexpected error occurred.");
  }

  //
  // if (expectedError)

  return Promise.reject(error);
});

export function setJwt(jwt: string) {
  axios.defaults.headers.common["rollover-auth-token"] = jwt;
}

export function getJwt() {
  return localStorage.getItem("rollover-auth-token") || "";
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};

export default httpService;
