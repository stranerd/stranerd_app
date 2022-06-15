import { IViewRepository } from '../irepositories/iview'
import { Listeners, QueryParams } from '@modules/core'
import { ViewEntity } from '../entities/view'
import { InteractionEntity } from '../types'

export class ViewsUseCase {
	private repository: IViewRepository

	constructor (repository: IViewRepository) {
		this.repository = repository
	}

	async add (entity: InteractionEntity) {
		return await this.repository.add({ entity })
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

	async listenToOne (entity: InteractionEntity, id: string, listener: Listeners<ViewEntity>) {
		return await this.repository.listenToOne(entity, id, listener)
	}

	async listen (entity: InteractionEntity, listener: Listeners<ViewEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(entity, conditions, listener, (entity) => !!entity)
	}
}
