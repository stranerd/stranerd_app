import { ISubjectRepository } from '../../irepositories/isubject'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get({
			sort: { field: 'name' },
			all: true
		})
	}
}
