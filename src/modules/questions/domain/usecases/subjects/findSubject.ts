import { ISubjectRepository } from '../../irepositories/isubject'

export class FindSubjectUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
