import { IInstitutionRepository } from '../../irepositories/iinstitution'
import { InstitutionFactory } from '../../factories/institution'

export class EditInstitutionUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call (id: string, factory: InstitutionFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
