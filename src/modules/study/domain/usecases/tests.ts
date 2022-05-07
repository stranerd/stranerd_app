import { ITestRepository } from '../irepositories/itest'
import { TestToModel } from '../../data/models/test'
import { Listeners, QueryParams } from '@modules/core'
import { TestEntity } from '../entities/test'

export class TestsUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async add (data: TestToModel) {
		return await this.repository.add(data)
	}

	async end (id: string) {
		return await this.repository.end(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get () {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<TestEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<TestEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}

	async updateAnswer (id: string, questionId: string, answer: number | string) {
		return await this.repository.updateAnswer(id, questionId, answer)
	}
}
