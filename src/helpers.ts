import { Ruler } from './types'

/** Rounds to 10 digits */
export const roundNum = (num: number) => Math.round(num * 1e10) / 1e10

export class UnitValues {
	etzba: 0.024 | 0.02
	tefach: number
	sit: number
	zeret: number
	amah: number
	ris: number
	mil: number
	parsa: number

	constructor(ruler: Ruler) {
		// Base unit is meter
		this.etzba  = ruler === 'חזון_איש' ? 0.024 : 0.02
		this.tefach = roundNum(4 * this.etzba)
		this.sit    = roundNum(2 * this.tefach)
		this.amah   = roundNum(6 * this.tefach)
		this.zeret  = roundNum(0.5 * this.amah)
		this.mil    = roundNum(2000 * this.amah)
		this.parsa  = roundNum(4 * this.mil)
		this.ris    = roundNum(2/15 * this.mil)
	}
}
