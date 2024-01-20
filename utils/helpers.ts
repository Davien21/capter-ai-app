import { AxiosError } from "axios";
import { IAPIResponse } from "interfaces";

export const filledArray = (length: number, value: any) => {
  return Array.from({ length }, () => value);
};

export const formatPrice = (price: number) => {
  return `${price
    .toLocaleString("en-US", {
      style: "currency",
      currency: "NZD",
      // currencyDisplay: "code",
    })
    .replace(".00", "")
    .replace("NZ$", "NZ$ ")}`;
};
export function handleAxiosError(error: any) {
  const axiosError = error as AxiosError<IAPIResponse<any>>;
  const message = axiosError.response?.data.message;
  const statusCode = axiosError.response?.status;

  if (!message || statusCode === 500) return;
  if (message === "Resource not found") {
    return "";
  }
  if (message === "Please verify your account") {
  } else {
    // toaster.error(message);
    return message;
  }
  return message;
}

export const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const truncate = (str: string, length: number = 120) => {
  return str?.length > length ? str?.slice(0, length) + "..." : str;
};
