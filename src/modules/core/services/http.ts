import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'
import { getTokens, saveTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'

export class NetworkError extends Error {
	readonly statusCode: StatusCodes
	readonly errors: { message: string; field?: string }[]

	constructor (statusCode: number, errors: { message: string; field?: string }[]) {
		super()
		this.statusCode = statusCode
		this.errors = errors
	}
}

export class HttpClient {
	private readonly client: AxiosInstance

	constructor (baseURL: string) {
		this.client = axios.create({ baseURL })
		this.client.interceptors.request.use(async (config) => {
			const isFromOurServer = Object.values(apiBases).find((base) => !!config.baseURL?.startsWith(base))
			if (!isFromOurServer) return config
			const { accessToken, refreshToken } = await getTokens()
			config.headers = config.headers ?? {}
			if (accessToken) config.headers['Access-Token'] = accessToken
			if (refreshToken) config.headers['Refresh-Token'] = refreshToken
			return config
		}, (error) => Promise.reject(error))
	}

	async get<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'get', body)
	}

	async post<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'post', body)
	}

	async put<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'put', body)
	}

	async delete<Body, ReturnValue> (url: string, body: Body): Promise<ReturnValue> {
		return this.makeRequest<Body, ReturnValue>(url, 'delete', body)
	}

	async download (url: string) {
		try {
			const { data: blob } = await this.client.get(url, { responseType: 'blob' })
			const base64: string = await new Promise((res, rej) => {
				const reader = new FileReader
				reader.onerror = rej
				reader.onload = () => res(reader.result as string)
				reader.readAsDataURL(blob)
			})
			return { blob, base64 }
		} catch (e: any) {
			throw new Error('Error downloading file')
		}
	}

	private async makeRequest<Body, ReturnValue> (url: string, method: Method, data: Body): Promise<ReturnValue> {
		try {
			const res = await this.client.request<Body, AxiosResponse<ReturnValue>>({
				url, method, [method === 'get' ? 'params' : 'data']: data
			})
			return res.data
		} catch (e) {
			const error = e as unknown as AxiosError
			if (!error.isAxiosError) throw error
			if (!error.response) throw error
			const status = error.response.status
			const isFromOurServer = Object.values(apiBases).find((base) => this.client.defaults.baseURL?.startsWith(base)) && Object.values(StatusCodes).includes(status)
			if (!isFromOurServer) throw error
			if (status !== StatusCodes.AccessTokenExpired) throw new NetworkError(status, error.response.data)
			const res = await this.getNewTokens()
			if (res) return this.makeRequest(url, method, data)
			else throw error
		}
	}

	private async getNewTokens () {
		try {
			const { data } = await this.client.post<any, AxiosResponse<AfterAuthUser>>('/token', {}, { baseURL: apiBases.AUTH })
			await saveTokens(data)
			return !!data
		} catch (e) {
			const error = e as unknown as AxiosError
			if (!error.isAxiosError) throw error
			if (!error.response) throw error
			const status = error.response.status
			throw new NetworkError(status, error.response.data)
		}
	}
}

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

export enum QueryKeys { and = 'and', or = 'or' }

export enum Conditions {
	lt = 'lt', lte = 'lte', gt = 'gt', gte = 'gte',
	eq = 'eq', ne = 'ne', in = 'in', nin = 'nin'
}

type Where = { field: string, value: any, condition?: Conditions }
type WhereBlock = { condition: QueryKeys, value: (Where | WhereBlock)[] }
type WhereClause = Where | WhereBlock

export interface QueryParams {
	where?: WhereClause[]
	auth?: WhereClause[]
	whereType?: QueryKeys
	authType?: QueryKeys
	sort?: [{ field: string, desc?: boolean }]
	limit?: number
	all?: boolean
	page?: number
	search?: { value: string, fields: string[] }
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
