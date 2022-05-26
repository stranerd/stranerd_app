import { Listeners, QueryParams } from '@modules/core'
import { IDiscussionRepository } from '../../domain/irepositories/idiscussion'
import { DiscussionEntity } from '../../domain/entities/discussion'
import { DiscussionBaseDataSource } from '../datasources/discussion-base'
import { DiscussionTransformer } from '../transformers/discussion'
import { DiscussionToModel } from '../models/discussion'

export class DiscussionRepository implements IDiscussionRepository {
	private dataSource: DiscussionBaseDataSource
	private transformer: DiscussionTransformer

	constructor (dataSource: DiscussionBaseDataSource, transformer: DiscussionTransformer) {
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

	async listenToOne (classId: string, id: string, listener: Listeners<DiscussionEntity>) {
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

	async listenToMany (classId: string, query: QueryParams, listener: Listeners<DiscussionEntity>, matches: (entity: DiscussionEntity) => boolean) {
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

	async add (classId: string, data: DiscussionToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(classId, data))
	}

	async find (classId: string, id: string) {
		const model = await this.dataSource.find(classId, id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async markRead (classId: string, groupId: string) {
		return this.dataSource.markRead(classId, groupId)
	}
}
