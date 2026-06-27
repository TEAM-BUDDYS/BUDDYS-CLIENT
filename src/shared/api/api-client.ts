import ky from "ky";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const apiClient = ky.create({
  prefix: API_BASE_URL,
  credentials: 'include',
  timeout: 10000,
  retry: 0,
});