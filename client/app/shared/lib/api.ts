import { isAxiosError } from "axios";
import { data } from "react-router";

type ResponseShape = {
	data: unknown;
	status: number;
};

export function unwrapApiResponse<T>(response: ResponseShape) {
	if (response.status >= 200 && response.status < 300) {
		return response.data as T;
	}

	throw data(response.data, { status: response.status });
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
