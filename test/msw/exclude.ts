const MSW_EXCLUDE: ((url: string) => boolean)[] = [
	(url) => url.includes("_next"),
	(url) => url.startsWith("https://fonts.googleapis.com"),
	(url) => url.startsWith("https://fonts.gstatic.com"),
]

export function isExcluded(request: Request): boolean {
	return MSW_EXCLUDE.some((test) => test(request.url))
}