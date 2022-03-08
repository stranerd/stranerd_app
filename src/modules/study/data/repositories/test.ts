import { Listeners, QueryParams } from '@modules/core'
import { ITestRepository } from '../../domain/irepositories/itest'
import { TestEntity } from '../../domain/entities/test'
import { TestBaseDataSource } from '../datasources/test-base'
import { TestTransformer } from '../transformers/test'
import { TestToModel } from '../models/test'

export class TestRepository implements ITestRepository {
	private dataSource: TestBaseDataSource
	private transformer: TestTransformer

	constructor (dataSource: TestBaseDataSource, transformer: TestTransformer) {
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

	async listenToOne (id: string, listener: Listeners<TestEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<TestEntity>, matches: (entity: TestEntity) => boolean) {
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

	async add (data: TestToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async updateAnswer (id: string, questionId: string, answer: number | string) {
		return this.dataSource.updateAnswer(id, questionId, answer)
	}

	async end (id: string) {
		return this.dataSource.end(id)
	}
}
