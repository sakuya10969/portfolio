export function formatMonth(date: string) {
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "short",
	}).format(new Date(date));
}
