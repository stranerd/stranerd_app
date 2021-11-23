import { IInstitutionRepository } from '../../irepositories/iinstitution'

export class DeleteInstitutionUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
