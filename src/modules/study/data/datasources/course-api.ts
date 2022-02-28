import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { CourseFromModel, CourseToModel } from '../models/course'
import { CourseBaseDataSource } from './course-base'

export class CourseApiDataSource implements CourseBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/courses')
	}

	async create (data: CourseToModel) {
		const course = await this.stranerdClient.post<CourseToModel, CourseFromModel>('/', data)
		return course.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, CourseFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<CourseFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<CourseFromModel>) {
		const listener = listenOnSocket(`study/courses/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<CourseFromModel>) {
		const listener = listenOnSocket('study/courses', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: CourseToModel) {
		await this.stranerdClient.put<CourseToModel, CourseFromModel>(`/${id}`, data)
	}
}
