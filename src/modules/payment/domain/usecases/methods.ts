import { IMethodRepository } from '../irepositories/imethod'
import { Listeners } from '@modules/core'
import { MethodEntity } from '../entities/method'

export class MethodsUseCase {
	private repository: IMethodRepository

	constructor (repository: IMethodRepository) {
		this.repository = repository
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async makePrimary (id: string) {
		return await this.repository.makePrimary(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get () {
		return await this.repository.get({ all: true })
	}

	async getPrimary () {
		const { results } = await this.repository.get({
			where: [{ field: 'primary', value: true }, { field: 'expired', value: false }],
			limit: 1
		})
		return results.at(0) ?? null
	}

	async listenToOne (id: string, listener: Listeners<MethodEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<MethodEntity>) {
		return await this.repository.listenToMany({ all: true }, listener, () => true)
	}
}
