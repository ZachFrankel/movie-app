interface Provider {
  id: string;
  name: string;
  status: "enabled" | "disabled";
  rank: number;
  type: string;
}

interface ProvidersResponse {
  providers: Provider[];
  count: number;
  timestamp: string;
}

const BASE_URL = "https://api.sussybaka.tech";

export async function fetchProviders(): Promise<Provider[]> {
  try {
    const response = await fetch(`${BASE_URL}/providers/`, {
      headers: {
        "x-api-key": import.meta.env.VITE_PROVIDER_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch providers");
    }

    const data: ProvidersResponse = await response.json();
    return data.providers;
  } catch (error) {
    console.error(error);
    return [];
  }
}