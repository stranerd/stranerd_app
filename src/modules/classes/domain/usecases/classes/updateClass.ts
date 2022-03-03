import { IClassRepository } from '../../irepositories/iclass'
import { ClassFactory } from '../../factories/class'

export class UpdateClassUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string, factory: ClassFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
