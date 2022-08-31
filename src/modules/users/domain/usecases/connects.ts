import { Listeners } from '@modules/core'
import { IConnectRepository } from '../irepositories/iconnect'
import { ConnectEntity } from '../entities/connect'

export class ConnectsUseCase {
	private repository: IConnectRepository

	constructor (repository: IConnectRepository) {
		this.repository = repository
	}

	async get () {
		return await this.repository.get({ all: true })
	}

	async listen (listener: Listeners<ConnectEntity>) {
		return await this.repository.listenToMany({ all: true }, listener, (entity) => !!entity.id)
	}

	async create (userId: string) {
		return await this.repository.create(userId)
	}

	async accept (id: string, accept: boolean) {
		return await this.repository.accept(id, accept)
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}
}
