import { Listeners } from '@modules/core'
import { ClassEntity } from '../../entities/class'
import { IClassRepository } from '../../irepositories/iclass'

export class ListenToClassUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<ClassEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
