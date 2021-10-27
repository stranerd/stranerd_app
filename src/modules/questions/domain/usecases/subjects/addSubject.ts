import { ISubjectRepository } from '../../irepositories/isubject'
import { SubjectFactory } from '../../factories/subject'

export class AddSubjectUseCase {
	private repository: ISubjectRepository

	constructor (repository: ISubjectRepository) {
		this.repository = repository
	}

	async call (factory: SubjectFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
