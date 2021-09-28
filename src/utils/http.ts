export enum StatusCodes {
	Ok = 200,
	BadRequest = 400,
	NotAuthenticated = 401,
	NotAuthorized = 403,
	NotFound = 404,
	ValidationError = 422,
	EmailNotVerified = 460,
	AccessTokenExpired = 461,
	RefreshTokenMisused = 462,
	InvalidToken = 463
}

export enum Conditions {
	lt = 'lt', lte = 'lte', gt = 'gt', gte = 'gte',
	eq = 'eq', ne = 'ne', in = 'in', nin = 'nin'
}

type Where = { field: string, value: any, condition?: Conditions }

export interface QueryParams {
	where?: Where[]
	auth?: Where[]
	whereType?: 'and' | 'or'
	sort?: { field: string, order?: 1 | -1 }
	limit?: number
	all?: boolean
	page?: number
	search?: string
}

export interface QueryResults<Model> {
	pages: {
		start: number,
		last: number,
		previous: number | null,
		next: number | null,
		current: number,
	},
	docs: {
		limit: number,
		total: number,
		count: number
	},
	results: Model[]
}
