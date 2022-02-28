import { Conditions, Listeners, QueryParams } from '@modules/core'
import { INoteRepository } from '../../irepositories/inote'
import { NoteEntity } from '../../entities/note'

export class ListenToNotesUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<NoteEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
