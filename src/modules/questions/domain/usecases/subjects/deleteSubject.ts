import { ISubjectRepository } from '../../irepositories/isubject'

export class DeleteSubjectUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
