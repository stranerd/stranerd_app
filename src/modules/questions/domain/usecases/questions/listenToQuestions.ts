import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<QuestionEntity>, date?: number) {
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
