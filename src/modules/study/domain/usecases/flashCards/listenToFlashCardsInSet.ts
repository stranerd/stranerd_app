import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardEntity } from '../../entities/flashCard'

export class ListenToFlashCardsInSetUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<FlashCardEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}
}
