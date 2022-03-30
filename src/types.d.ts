export interface Unit {
	hidden: boolean
	name: string
	value: number
}

export type Ruler = 'גרח' | 'חזון_איש'

export type Page = 'length' | 'volume'

export type DefaultUnits = {
	input: string,
	output: string,
}
