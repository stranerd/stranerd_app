import { ISetRepository } from '../../irepositories/iset'
import { SetFactory } from '../../factories/set'

export class EditSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (id: string, factory: SetFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
