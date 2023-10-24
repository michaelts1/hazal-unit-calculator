/**
 * Rounds to 10 digits
 * @param num Number to round
 * @param d Number of digits after fractional point, defaults to 10
 */
export const roundNum = (num: number, d = 10) => Math.round(num * 10**d) / 10**d

/**
 * Returns a debounced version of the provided function
 * @param f The function to debounce
 * @param timeoutMs The number of milliseconds to wait before executing the function
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // T can be *any* function
export function debounce<T extends (...args: any[]) => any>(f: T, timeoutMs: number) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined
	return (...args: Parameters<typeof f>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => f(...args), timeoutMs)
	}
}
