import { AppType } from "@/types/App";

export async function fetchApps(): Promise<AppType[]> {
  const response = await fetch("https://pluga.co/ferramentas_search.json");
  return response.json();
}
