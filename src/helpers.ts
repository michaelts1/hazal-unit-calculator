/**
 * Rounds to 10 digits
 * @param {number} num Number to round
 * @param {number} [d=10] Number of digits after fractional point
 */
export const roundNum = (num: number, d = 10) => Math.round(num * 10**d) / 10**d
