import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionEntity } from '../../entities/question'

export class ListenToSimilarQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (questionId: string, tags: string[], listener: Listeners<QuestionEntity>) {
		const conditions: QueryParams = {
			where: [
				{ field: 'tags', condition: Conditions.in, value: tags },
				{ field: 'id', condition: Conditions.ne, value: questionId }
			],
			sort: { field: 'createdAt', order: -1 },
			limit: 10
		}

		return await this.repository.listenToMany(conditions, {
			created: async (entity) => {
				if (entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag))) await listener.created(entity)
			},
			updated: async (entity) => {
				if (entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag))) await listener.updated(entity)
			},
			deleted: async (entity) => {
				if (entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag))) await listener.deleted(entity)
			}
		}, (entity) => entity.id !== questionId && tags.some((tag) => entity.tags.includes(tag)))
	}
}
