import { isAxiosError } from "axios";
import { data } from "react-router";

type ResponseShape = {
	data: unknown;
	status: number;
};

type ApiPayload<T> = {
	data: T;
};

export function unwrapApiResponse<T>(response: ResponseShape) {
	if (response.status >= 200 && response.status < 300) {
		return response.data as T;
	}

	throw data(response.data, { status: response.status });
}

export function extractApiData<T>(response: unknown): T | undefined {
	if (!response || typeof response !== "object" || !("data" in response)) {
		return undefined;
	}

	const payload = response.data;

	if (!payload || typeof payload !== "object" || !("data" in payload)) {
		return undefined;
	}

	return (payload as ApiPayload<T>).data;
}

export function getApiErrorMessage(error: unknown) {
	if (isAxiosError(error)) {
		return error.response?.data?.message ?? error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "An unexpected error occurred.";
}
