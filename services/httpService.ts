import axios, { AxiosError } from "axios";
import { toast } from "sonner";
// import toaster from "./toastService";

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
    toast.error("An unexpected error occurred.");
  }

  //
  // if (expectedError)

  return Promise.reject(error);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default httpService;
