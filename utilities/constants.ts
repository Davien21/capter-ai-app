const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const scope = encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
);

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${BACKEND_BASE_URL}/auth/google&scope=${scope}&access_type=offline&prompt=consent`;
