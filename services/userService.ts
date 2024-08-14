import { IAPIResponse, IProfileUpdate } from "interfaces";
// import { getAuthToken } from "../utils/helpers";
import httpService from "./httpService";

const route = `/users`;
export async function GetDashboardHomeDetails(jwt?: string) {
  const headers = {
    "cai-auth-tk": jwt || "",
    "Content-Type": "application/json",
  };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${route}/home`;
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) return Promise.reject(response);
  const data = await response.json();
  return data;
}

export async function GetUserProfile(id: string) {
  const headers = {};
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${route}`;
  const response = await fetch(`${url}/profile/${id}`);
  if (!response.ok) return Promise.reject(response);

  const data = await response.json();
  return data;
}

export async function UpdateProfile(body: Partial<IProfileUpdate>) {
  return await httpService.patch<IAPIResponse<null>>(`${route}/profile`, body);
}

export async function ChangeProfileImage(file: File | Blob) {
  const formData = new FormData();
  formData.append("file", file);
  return await httpService.patch<IAPIResponse<null>>(
    `${route}/profile/image`,
    formData
  );
}
