import { INoteRepository } from '../../irepositories/inote'

export class SearchNotesUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['title', 'description'] }
		})
	}
}
