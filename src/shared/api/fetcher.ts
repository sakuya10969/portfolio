export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: "An error occurred" } }));
    throw new Error(error?.error?.message ?? "An error occurred");
  }
  return res.json();
};
