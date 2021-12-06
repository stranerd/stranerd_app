import { Listeners, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardEntity } from '../../entities/flashCard'

export class ListenToUserFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<FlashCardEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }],
			sort: { field: 'createdAt', order: -1 },
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.userId === userId
		})
	}
}
