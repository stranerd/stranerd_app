import axios, { AxiosInstance, Method } from 'axios'
import { getTokens, saveTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'
import type { QueryParams, QueryResults } from '@utils/http'
import { Conditions, StatusCodes } from '@utils/http'
import { Http } from '@capacitor-community/http'

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
	private readonly baseURL: string
	private readonly headers: Record<string, string>

	constructor (baseURL: string, headers?: Record<string, string>) {
		this.baseURL = baseURL
		this.headers = headers ?? { 'content-type': 'application/json' }
		this.client = axios.create({ baseURL })
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

	private async makeRequest<Body, ReturnValue> (url: string, method: Method, body: Body): Promise<ReturnValue> {
		const newUrl = this.client.getUri({
			url, method,
			headers: await this.getHeaders(),
			[method === 'get' ? 'params' : 'data']: body
		})
		const { data, status } = await Http.request({
			method: method.toUpperCase(),
			url: `${this.baseURL}${newUrl}`,
			headers: await this.getHeaders(),
			...(method === 'get' ? {} : { data: body })
		})
		if (status > 399) {
			const isFromOurServer = Object.values(apiBases).find((base) => this.client.defaults.baseURL?.startsWith(base)) && Object.values(StatusCodes).includes(status)
			if (!isFromOurServer) throw new Error(data.toString())
			if (status !== StatusCodes.AccessTokenExpired) throw new NetworkError(status, data)
			const res = await this.getNewTokens()
			if (res) return this.makeRequest(url, method, data)
		}
		return data
	}

	private async getNewTokens () {
		const { data, status } = await Http.post({ url: apiBases.AUTH + '/token', headers: await this.getHeaders() })
		if (status > 399) throw new NetworkError(status, data)
		await saveTokens(data)
		return !!data
	}

	private async getHeaders () {
		const headers = this.headers
		const isFromOurServer = Object.values(apiBases).find((base) => !!this.baseURL?.startsWith(base))
		if (!isFromOurServer) return headers
		const { accessToken, refreshToken } = await getTokens()
		if (accessToken) headers['Access-Token'] = accessToken
		if (refreshToken) headers['Refresh-Token'] = refreshToken
		return headers
	}
}
