import { IPastQuestionRepository } from '../irepositories/ipastQuestion'
import { PastQuestionFactory } from '../factories/pastQuestion'
import { Conditions, QueryParams } from '@modules/core'
import { PastQuestionType } from '../entities/pastQuestion'

export class PastQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async add (factory: PastQuestionFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: PastQuestionFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async getCourseQuestions (data: {
		institutionId: string | null
		courseId: string | null
		year: number | null
		questionType: PastQuestionType | null
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

		return await this.repository.get(conditions)
	}

	async getQuestionsInList (questionIds: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: questionIds }],
			all: true
		}

		const { results } = await this.repository.get(conditions)
		return questionIds.map((id) => results.find((q) => q.id === id)!)
			.filter((q) => q)
	}
}
