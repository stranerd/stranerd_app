import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToUserAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<AnswerEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			where: [{ field: 'userId', value: userId }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (entity.userId !== userId) return false
			if (date) return entity.createdAt > date
			return true
		})
	}
}
