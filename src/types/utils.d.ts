type Require = string | number | boolean
type Nullable = Require | undefined | null

declare type DeepRequired<T> = Required<T extends Require ? T : {
	[K in keyof T]: DeepRequired<T[K]>
}>

declare type DeepNullable<T> = T extends Nullable ? T : undefined | {
	[K in keyof T]: DeepNullable<T[K]>
}
