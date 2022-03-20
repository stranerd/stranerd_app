import { Conditions, QueryParams } from '@modules/core'
import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'

export class GetTestQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (questionIds: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: questionIds }],
			all: true
		}

		const { results } = await this.repository.get(conditions)
		return questionIds.map((id) => results.find((q) => q.id === id)!)
			.filter((q) => q)
	}
}
