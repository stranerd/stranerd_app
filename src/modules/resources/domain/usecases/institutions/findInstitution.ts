import { IInstitutionRepository } from '../../irepositories/iinstitution'

export class FindInstitutionUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
