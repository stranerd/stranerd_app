import { Conditions, Listeners, QueryParams } from '@modules/core'
import { INoteRepository } from '../../irepositories/inote'
import { NoteEntity } from '../../entities/note'

export class ListenToUserNotesUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<NoteEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			all: true,
			where: [{ field: 'userId', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			const matches = [entity.userId === userId]
			if (date) matches.push(entity.createdAt > date)
			return matches.every((m) => m)
		})
	}
}
