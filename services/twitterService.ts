import { IAPIResponse } from "interfaces";
import httpService from "./httpService";

const route = `/twitter`;

export async function GenerateTweet({ messages }: { messages: any[] }) {
  return await httpService.post<IAPIResponse<{ tweet: string }>>(
    `${route}/generate-tweet`,
    {
      messages,
    }
  );
}

export async function PostTweet({ tweet }: { tweet: string }) {
  return await httpService.post<IAPIResponse<{ tweet: string }>>(
    `${route}/post-tweet`,
    { tweet }
  );
}

export async function GetAuthUrl() {
  return await httpService.get<IAPIResponse<{ url: string }>>(
    `${route}/get-auth-url`
  );
}
