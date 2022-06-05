import { Listeners, QueryParams } from '@modules/core'
import { ISchemeRepository } from '../../domain/irepositories/ischeme'
import { SchemeEntity } from '../../domain/entities/scheme'
import { SchemeBaseDataSource } from '../datasources/scheme-base'
import { SchemeTransformer } from '../transformers/scheme'
import { SchemeToModel } from '../models/scheme'

export class SchemeRepository implements ISchemeRepository {
	private dataSource: SchemeBaseDataSource
	private transformer: SchemeTransformer

	constructor (dataSource: SchemeBaseDataSource, transformer: SchemeTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (classId: string, query: QueryParams) {
		const models = await this.dataSource.get(classId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (classId: string, id: string, listener: Listeners<SchemeEntity>) {
		return this.dataSource.listenToOne(classId, id, {
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

	async listenToMany (classId: string, query: QueryParams, listener: Listeners<SchemeEntity>, matches: (entity: SchemeEntity) => boolean) {
		return this.dataSource.listenToMany(classId, query, {
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

	async add (classId: string, data: SchemeToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(classId, data))
	}

	async find (classId: string, id: string) {
		const model = await this.dataSource.find(classId, id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (classId: string, id: string, data: SchemeToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(classId, id, data))
	}

	async delete (classId: string, id: string) {
		return this.dataSource.delete(classId, id)
	}

	async markRead (classId: string) {
		return this.dataSource.markRead(classId)
	}
}
