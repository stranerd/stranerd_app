import { Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IConnectRepository } from '../irepositories/iconnect'
import { ConnectEntity } from '../entities/connect'

export class ConnectsUseCase {
	private repository: IConnectRepository

	constructor (repository: IConnectRepository) {
		this.repository = repository
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get () {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		return await this.repository.get(conditions)
	}

	async listen (listener: Listeners<ConnectEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => !!entity)
	}

	async create (userId: string) {
		return await this.repository.create(userId)
	}

	async accept (id: string) {
		return await this.repository.accept(id)
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}
}
