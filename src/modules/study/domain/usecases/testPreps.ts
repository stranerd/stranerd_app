import { ITestPrepRepository } from '../irepositories/itestPrep'
import { TestPrepFactory } from '../factories/testPrep'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { TestPrepEntity } from '../entities/testPrep'
import { PastQuestionType } from '@modules/school'

const searchFields = ['name']

type Filters = {
	institutionId: string | null,
	courseId: string | null,
	year: number | null,
	questionTypes: PastQuestionType[]
}

export class TestPrepsUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async add (factory: TestPrepFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: TestPrepFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(conditions)
	}

	async getInList (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<TestPrepEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<TestPrepEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}

	async listenInList (ids: string[], listener: Listeners<TestPrepEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}

	async search (detail: string) {
		const query: QueryParams = {
			all: true, search: { value: detail, fields: searchFields }
		}
		return (await this.repository.get(query)).results
	}

	async searchWithFilters (search: string, filters: Filters) {
		const query: QueryParams = {
			where: [{ field: 'data.questionType', value: filters.questionTypes, condition: Conditions.in }],
			all: true, search: { value: search, fields: searchFields }
		}

		if (filters.institutionId) query.where!.push({ field: 'data.institutionId', value: filters.institutionId })
		if (filters.courseId) query.where!.push({ field: 'data.courseId', value: filters.courseId })
		if (filters.year) query.where!.push({ field: 'data.year', value: filters.year })

		return (await this.repository.get(query)).results
	}
}
