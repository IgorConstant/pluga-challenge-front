import { AppType } from "@/types/App";

export async function fetchApps(): Promise<AppType[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
  return response.json();
}
