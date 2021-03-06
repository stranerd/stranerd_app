import { IAnswerRepository } from '../irepositories/ianswer'
import { AnswerFactory } from '../factories/answer'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { AnswerEntity } from '../entities/answer'

const searchFields = ['body']

export class AnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async add (factory: AnswerFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async update (id: string, factory: AnswerFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async getQuestionAnswers (questionId: string) {
		return await this.repository.get({
			where: [{ field: 'questionId', value: questionId }],
			sort: [{ field: 'createdAt' }],
			all: true
		})
	}

	async getUserAnswers (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT,
			where: [{ field: 'user.id', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async searchUserAnswers (userId: string, search: string) {
		const query = {
			where: [{ field: 'user.id', value: userId }],
			all: true, search: { value: search, fields: searchFields }
		}
		return (await this.repository.get(query)).results
	}

	async listenToQuestionAnswers (questionId: string, listener: Listeners<AnswerEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'questionId', value: questionId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}, listener, (entity) => entity.questionId === questionId)
	}

	async listenToUserAnswers (userId: string, listener: Listeners<AnswerEntity>, date?: number) {
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

	async listenToOne (answerId: string, listener: Listeners<AnswerEntity>) {
		return await this.repository.listenToOne(answerId, listener)
	}
}
