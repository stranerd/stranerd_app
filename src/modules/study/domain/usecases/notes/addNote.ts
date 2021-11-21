import { INoteRepository } from '../../irepositories/inote'
import { NoteFactory } from '../../factories/note'

export class AddNoteUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (factory: NoteFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
