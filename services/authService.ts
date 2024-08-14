import { IAPIResponse, ILogin, ISignup } from "interfaces";
// import { getAuthToken } from "../utils/helpers";
import httpService from "./httpService";

const route = `/auth`;

export async function SignupUser(body: ISignup) {
  return await httpService.post<IAPIResponse<null>>(`${route}/signup`, body);
}

export async function LoginUser(body: ILogin) {
  return await httpService.post<IAPIResponse<null>>(`${route}/login`, body);
}

export async function sendOtp(body: { email: string }) {
  return await httpService.post<IAPIResponse<null>>(
    `${route}/resend-otp`,
    body
  );
}

export async function sendPasswordOtp(body: { email: string }) {
  return await httpService.post<IAPIResponse<null>>(
    `${route}/resend-password-otp`,
    body
  );
}

export async function AllowOnlyUnverifiedUser(email: string) {
  const headers = {};
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${route}/allow-only-unverified?email=${email}`;
  const response = await fetch(`${url}`);
  if (!response.ok) return Promise.reject(response);

  const data = await response.json();
  return data;
}

export async function verifyOtp(body: { email: string; otp: string }) {
  return await httpService.post<IAPIResponse<{ _id: string; name: string }>>(
    `${route}/verify-otp`,
    body
  );
}

export async function verifyPasswordOtp(body: { email: string; otp: string }) {
  return await httpService.post<IAPIResponse<{ _id: string; name: string }>>(
    `${route}/verify-password-otp`,
    body
  );
}

export async function ResetPassword(body: {
  otp: string;
  email: string;
  password: string;
}) {
  return await httpService.post<IAPIResponse<null>>(
    `${route}/reset-password`,
    body
  );
}

export async function VerifyUserAccess(jwt: string) {
  return await httpService.get<IAPIResponse<null>>(`${route}/verify-access`, {
    headers: { "rollover-auth-token": jwt },
  });
}

export async function TestCookies() {
  return await httpService.get<IAPIResponse<null>>(`${route}/test-cookies`);
}

export async function Logout() {
  return await httpService.post<IAPIResponse<null>>(`${route}/logout`);
}

export async function ServerLogout() {
  const headers = {};
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${route}`;
  const response = await fetch(`${url}/logout`, { method: "POST" });

  if (!response.ok) return Promise.reject(response);

  const data = await response.json();
  return data;
}
