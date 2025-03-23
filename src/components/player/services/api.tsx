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

interface Quality {
  type: string;
  url: string;
}

interface Qualities {
  [key: string]: Quality;
}

interface StreamSource {
  id: string;
  type: string;
  flags: string[];
  captions: any[];
  qualities?: Qualities;
  playlist?: string;
}

interface EmbedSource {
  embedId: string;
  url: string;
}

interface MediaResponse {
  stream?: StreamSource[];
  embeds?: EmbedSource[];
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

export async function fetchMedia(
  providerId: string,
  mediaType: "movie" | "tv",
  tmdbId: string,
  season?: number,
  episode?: number
): Promise<MediaResponse> {
  try {
    let url = "";
    
    if (mediaType === "movie") {
      url = `${BASE_URL}/providers/${providerId}/movie/${tmdbId}`;
    } else if (mediaType === "tv") {
      url = `${BASE_URL}/providers/${providerId}/tv/${tmdbId}/${season}/${episode}`;
    }

    const response = await fetch(url, {
      headers: {
        "x-api-key": import.meta.env.VITE_PROVIDER_API_KEY,
      },
    });

    const data: MediaResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}