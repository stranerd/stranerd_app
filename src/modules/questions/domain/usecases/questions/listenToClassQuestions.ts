import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity, QuestionType } from '../../entities/question'

export class ListenToClassQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (classId: string, listener: Listeners<QuestionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true,
			where: [{ field: 'data.classId', value: classId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			const matches = [entity.data.type === QuestionType.classes && entity.data.classId === classId]
			if (date) matches.push(entity.createdAt >= date)
			return matches.every((m) => m)
		})
	}
}
