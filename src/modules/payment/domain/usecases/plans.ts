import { IPlanRepository } from '../irepositories/iplan'
import { Listeners } from '@modules/core'
import { PlanEntity } from '../entities/plan'

export class PlansUseCase {
	private repository: IPlanRepository

	constructor (repository: IPlanRepository) {
		this.repository = repository
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get () {
		return await this.repository.get({ all: true })
	}

	async listenToOne (id: string, listener: Listeners<PlanEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<PlanEntity>) {
		return await this.repository.listenToMany({ all: true }, listener, () => true)
	}
}
