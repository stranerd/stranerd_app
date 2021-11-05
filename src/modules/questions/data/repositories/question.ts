import { Listeners, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../domain/irepositories/iquestion'
import { QuestionEntity } from '../../domain/entities/question'
import { QuestionBaseDataSource } from '../datasources/question-base'
import { QuestionTransformer } from '../transformers/question'
import { QuestionToModel } from '../models/question'

export class QuestionRepository implements IQuestionRepository {
	private dataSource: QuestionBaseDataSource
	private transformer: QuestionTransformer

	constructor (dataSource: QuestionBaseDataSource, transformer: QuestionTransformer) {
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

	async listenToOne (id: string, listener: Listeners<QuestionEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<QuestionEntity>, matches: (entity: QuestionEntity) => boolean) {
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

	async add (data: QuestionToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: QuestionToModel) {
		return this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}

	async markBestAnswer (questionId: string, answerId: string) {
		return this.dataSource.markBestAnswer(questionId, answerId)
	}
}
