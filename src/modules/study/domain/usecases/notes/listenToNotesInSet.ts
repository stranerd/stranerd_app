import { Conditions, Listeners, QueryParams } from '@modules/core'
import { INoteRepository } from '../../irepositories/inote'
import { NoteEntity } from '../../entities/note'

export class ListenToNotesInSetUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<NoteEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}
}
