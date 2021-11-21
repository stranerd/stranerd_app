import { ISetRepository } from '../../irepositories/iset'
import { SetFactory } from '../../factories/set'

export class AddSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (factory: SetFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
