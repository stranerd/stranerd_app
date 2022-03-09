import { IClassRepository } from '../../irepositories/iclass'
import { ClassFactory } from '../../factories/class'

export class AddClassUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (factory: ClassFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
