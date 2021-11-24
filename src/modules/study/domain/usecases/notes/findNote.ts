import { INoteRepository } from '../../irepositories/inote'

export class FindNoteUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
