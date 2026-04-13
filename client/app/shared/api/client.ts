import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import Axios from "axios";

export const axios = Axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
	headers: { "Content-Type": "application/json" },
});

function normalizeHeaders(headers: RequestInit["headers"]) {
	if (!headers) {
		return undefined;
	}

	if (headers instanceof Headers) {
		return Object.fromEntries(headers.entries());
	}

	if (Array.isArray(headers)) {
		return Object.fromEntries(headers);
	}

	return headers;
}

export const httpClient = async <T>(
	urlOrConfig: string | AxiosRequestConfig,
	options?: RequestInit,
): Promise<T> => {
	const config =
		typeof urlOrConfig === "string"
			? {
					data: options?.body,
					headers: normalizeHeaders(options?.headers),
					method: (options?.method ?? "GET") as Method,
					url: urlOrConfig,
				}
			: urlOrConfig;

	const response: AxiosResponse<T> = await axios(config);
	return response.data;
};

export default httpClient;
