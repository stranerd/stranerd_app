import { Listeners, QueryParams } from '@modules/core'
import { ICourseRepository } from '../../domain/irepositories/icourse'
import { CourseEntity } from '../../domain/entities/course'
import { CourseBaseDataSource } from '../datasources/course-base'
import { CourseTransformer } from '../transformers/course'
import { CourseToModel } from '../models/course'

export class CourseRepository implements ICourseRepository {
	private dataSource: CourseBaseDataSource
	private transformer: CourseTransformer

	constructor (dataSource: CourseBaseDataSource, transformer: CourseTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<CourseEntity>) {
		return this.dataSource.listenToOne(id, {
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}

	async listenToMany (query: QueryParams, listener: Listeners<CourseEntity>, matches: (entity: CourseEntity) => boolean) {
		return this.dataSource.listenToMany(query, {
			created: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.created(entity)
			},
			updated: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.updated(entity)
			},
			deleted: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.deleted(entity)
			}
		})
	}

	async add (data: CourseToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: CourseToModel) {
		return this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
