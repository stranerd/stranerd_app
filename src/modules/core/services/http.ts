import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'
import { getTokens, saveTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'
import type { QueryParams, QueryResults } from '@utils/http'
import { Conditions, StatusCodes } from '@utils/http'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'

export { StatusCodes, Conditions, QueryResults, QueryParams }

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
			if (!config.headers) config.headers = {}
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
			const isFromOurServer = Object.values(apiBases).includes(this.client.defaults.baseURL!) && Object.values(StatusCodes).includes(status)
			if (!isFromOurServer) throw error
			if (status !== StatusCodes.AccessTokenExpired) throw new NetworkError(status, error.response.data)
			const res = await this.getNewTokens()
			if (res) return this.makeRequest(url, method, data)
			else throw error
		}
	}

	private async getNewTokens () {
		try {
			const { data } = await this.client.post<{}, AxiosResponse<AfterAuthUser>>('/token', {}, { baseURL: apiBases.AUTH })
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
