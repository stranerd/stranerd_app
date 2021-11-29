import { Listeners } from '@modules/core'
import { INoteRepository } from '../../irepositories/inote'
import { NoteEntity } from '../../entities/note'

export class ListenToNoteUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<NoteEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
