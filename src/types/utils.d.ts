type Require = string | number | boolean
type Nullable = Require | undefined | null

declare type DeepRequired<T> = Required<T extends Require ? T : {
	[K in keyof T]: DeepRequired<T[K]>
}>

declare type DeepNullable<T> = T extends Nullable ? T : undefined | {
	[K in keyof T]: DeepNullable<T[K]>
}

type Cast<X, Y> = X extends Y ? X : Y

interface ObjectConstructor {
	keys<T> (val: T): (Cast<keyof T, string>)[]

	values<T> (val: T): (T[keyof T])[]

	entries<T> (val: T): {
		[K in keyof T]-?: [K, T[K]]
	}[Cast<keyof T, string>][]
}
