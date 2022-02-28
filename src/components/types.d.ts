export interface Unit extends Object {
	name: string
	value: number
	hidden: boolean
}

export interface ElementInputEvent<T extends Element> extends InputEvent {
	readonly target: T
}
