import { IAnswerRepository } from '../../irepositories/ianswer'

export class VoteAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string, vote: boolean) {
		return this.repository.vote(id, vote)
	}
}
