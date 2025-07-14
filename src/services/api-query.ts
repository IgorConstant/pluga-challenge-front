import axios from "axios";
import { AppType } from "@/types/App";

export async function fetchApps(): Promise<AppType[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não definida!");
  }
  const response = await axios.get<AppType[]>(apiUrl);
  return response.data;
}
