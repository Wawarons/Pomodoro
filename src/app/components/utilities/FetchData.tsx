import { FetchOptions } from "@/app/type";

export async function fetchData(url: string, options: FetchOptions) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, options);
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }