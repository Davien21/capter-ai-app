import { IAPIResponse } from "interfaces";
import httpService from "./httpService";

const route = `/products`;

export async function GetAllProducts(jwt?: string) {
  const headers = {
    "rr-adm-token": jwt || "",
    "Content-Type": "application/json",
  };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${route}`;
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) return Promise.reject(response);

  const data = await response.json();
  return data;
}

export async function GenerateTweet(id: string) {
  return await httpService.post<IAPIResponse<{ link: string }>>(
    `${route}/checkout/${id}`
  );
}
