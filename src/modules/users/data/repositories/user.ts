import { Listeners, QueryParams } from '@modules/core'
import { IUserRepository } from '../../domain/irepositories/iuser'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserTransformer } from '../transformers/user'
import { UserEntity } from '../../domain/entities/user'

export class UserRepository implements IUserRepository {
	private dataSource: UserBaseDataSource
	private transformer: UserTransformer

	constructor (dataSource: UserBaseDataSource, transformer: UserTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<UserEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<UserEntity>, matches: (entity: UserEntity) => boolean) {
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

	async updateStreak () {
		return this.dataSource.updateStreak()
	}
}
