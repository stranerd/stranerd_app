import { INoteRepository } from '../../irepositories/inote'
import { NoteFactory } from '../../factories/note'

export class EditNoteUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (id: string, factory: NoteFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
