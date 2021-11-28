import { Listeners } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetEntity } from '../../entities/set'

export class ListenToSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<SetEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
