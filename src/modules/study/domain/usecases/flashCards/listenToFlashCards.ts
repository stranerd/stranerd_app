import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardEntity } from '../../entities/flashCard'

export class ListenToFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<FlashCardEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }, { field: 'isPublic', value: true }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			const matches = entity.userId === userId && entity.isPublic
			if (!matches) return false
			if (date) return entity.createdAt > date
			return matches
		})
	}
}
