import { IViewRepository } from '../irepositories/iview'
import { Listeners } from '@modules/core'
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

	async find (id: string) {
		return await this.repository.find(id)
	}

	async listenToOne (id: string, listener: Listeners<ViewEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
