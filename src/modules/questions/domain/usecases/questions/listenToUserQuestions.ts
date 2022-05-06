import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToUserQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<QuestionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true,
			where: [{ field: 'user.id', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			const matches = [entity.user.id === userId]
			if (date) matches.push(entity.createdAt >= date)
			return matches.every((m) => m)
		})
	}
}
