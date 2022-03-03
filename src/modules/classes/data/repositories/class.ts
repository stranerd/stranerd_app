import { Listeners, QueryParams } from '@modules/core'
import { IClassRepository } from '../../domain/irepositories/iclass'
import { ClassEntity, ClassUsers } from '../../domain/entities/class'
import { ClassBaseDataSource } from '../datasources/class-base'
import { ClassTransformer } from '../transformers/class'
import { ClassToModel } from '../models/class'

export class ClassRepository implements IClassRepository {
	private dataSource: ClassBaseDataSource
	private transformer: ClassTransformer

	constructor (dataSource: ClassBaseDataSource, transformer: ClassTransformer) {
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

	async listenToOne (id: string, listener: Listeners<ClassEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<ClassEntity>, matches: (entity: ClassEntity) => boolean) {
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

	async add (data: ClassToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: ClassToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(id, data))
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}

	async requestClass (id: string, request: boolean) {
		return this.dataSource.requestClass(id, request)
	}

	async leaveClass (id: string) {
		return this.dataSource.leaveClass(id)
	}

	async acceptRequest (id: string, userId: string, accept: boolean) {
		return this.dataSource.acceptRequest(id, userId, accept)
	}

	async addMembers (id: string, userIds: string[], add: boolean) {
		return this.dataSource.addMembers(id, userIds, add)
	}

	async changeMemberRole (id: string, userId: string, role: ClassUsers, add: boolean) {
		return this.dataSource.changeMemberRole(id, userId, role, add)
	}
}
