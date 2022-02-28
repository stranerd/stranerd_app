import { Listeners, QueryParams } from '@modules/core'
import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'
import { PastQuestionEntity } from '../../entities/pastQuestion'

export class ListenToPastQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<PastQuestionEntity>, data: {
		institutionId: string | null
		courseId: string | null
		year: number | null
		questionType: string | null
	}) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true,
			where: []
		}
		if (data.institutionId) conditions.where!.push({ field: 'institutionId', value: data.institutionId })
		if (data.courseId) conditions.where!.push({ field: 'courseId', value: data.courseId })
		if (data.year) conditions.where!.push({ field: 'year', value: data.year })
		if (data.questionType) conditions.where!.push({ field: 'data.type', value: data.questionType })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			const matches = [] as boolean[]
			if (data.institutionId) matches.push(data.institutionId === entity.institutionId)
			if (data.courseId) matches.push(data.courseId === entity.courseId)
			if (data.year) matches.push(data.year === entity.year)
			return matches.every((m) => m)
		})
	}
}
