import { AxiosError } from "axios";

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError && error.response?.data?.message) {
    throw error.response.data.message;
  }
  throw 'Unknown error';
}