export interface Unit {
	id: string
	hidden: boolean
	name: string
	value: number
}

export type Ruler = 'grach' | 'chazonIsh'

export type DefaultUnits = {
	input: string,
	output: string,
}
