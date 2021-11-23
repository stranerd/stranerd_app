import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'
import { PastQuestionEntity } from '../../entities/pastQuestion'

export class ListenToPastQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<PastQuestionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt > date
			return true
		})
	}
}
