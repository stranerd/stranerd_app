import { Listeners } from '@modules/core'
import { IConnectRepository } from '../irepositories/iconnect'
import { ConnectEntity } from '../entities/connect'

export class ConnectsUseCase {
	private repository: IConnectRepository

	constructor (repository: IConnectRepository) {
		this.repository = repository
	}

	async findBetweenUsers (path: [string, string]) {
		return await this.repository.find(path.sort().join('---'))
	}

	async listenBetweenUsers (path: [string, string], listener: Listeners<ConnectEntity>) {
		return await this.repository.listenToOne(path.sort().join('---'), listener)
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
