import { IInstitutionRepository } from '../../irepositories/iinstitution'
import { InstitutionFactory } from '../../factories/institution'

export class AddInstitutionUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call (factory: InstitutionFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
