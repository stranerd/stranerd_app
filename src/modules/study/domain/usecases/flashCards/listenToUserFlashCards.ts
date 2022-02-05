import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardEntity } from '../../entities/flashCard'

export class ListenToUserFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<FlashCardEntity>, date?: number) {
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
