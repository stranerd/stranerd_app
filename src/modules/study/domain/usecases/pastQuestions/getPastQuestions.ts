import { QueryParams } from '@modules/core'
import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'

export class GetPastQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (data: {
		institutionId: string | null
		courseId: string | null
		year: number | null
		questionType: string | null
	}) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			all: true,
			where: []
		}
		if (data.institutionId) conditions.where!.push({ field: 'institutionId', value: data.institutionId })
		if (data.courseId) conditions.where!.push({ field: 'courseId', value: data.courseId })
		if (data.year) conditions.where!.push({ field: 'year', value: data.year })
		if (data.questionType) conditions.where!.push({ field: 'data.type', value: data.questionType })

		return await this.repository.get(conditions)
	}
}
