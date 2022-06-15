import { ILikeRepository } from '../irepositories/ilike'
import { Listeners, QueryParams } from '@modules/core'
import { LikeEntity } from '../entities/like'
import { InteractionEntity } from '../types'

export class LikesUseCase {
	private repository: ILikeRepository

	constructor (repository: ILikeRepository) {
		this.repository = repository
	}

	async add (entity: InteractionEntity, value: boolean) {
		return await this.repository.add({ entity, value })
	}

	async find (entity: InteractionEntity, id: string) {
		return await this.repository.find(entity, id)
	}

	async get (entity: InteractionEntity) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(entity, conditions)
	}

	async listenToOne (entity: InteractionEntity, id: string, listener: Listeners<LikeEntity>) {
		return await this.repository.listenToOne(entity, id, listener)
	}

	async listen (entity: InteractionEntity, listener: Listeners<LikeEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(entity, conditions, listener, (entity) => !!entity)
	}
}
