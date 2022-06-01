import { ISchemeRepository } from '../irepositories/ischeme'
import { SchemeFactory } from '../factories/scheme'
import { Listeners, QueryParams } from '@modules/core'
import { SchemeEntity } from '../entities/scheme'

export class SchemesUseCase {
	private repository: ISchemeRepository

	constructor (repository: ISchemeRepository) {
		this.repository = repository
	}

	async add (factory: SchemeFactory) {
		const data = await factory.toModel()
		return await this.repository.add(data.classId, data)
	}

	async delete (classId: string, id: string) {
		return await this.repository.delete(classId, id)
	}

	async find (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}

	async getClassSchemes (classId: string) {
		const conditions: QueryParams = { all: true }
		return await this.repository.get(classId, conditions)
	}

	async listenToOne (classId: string, id: string, listener: Listeners<SchemeEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}

	async listenToClassSchemes (classId: string, listener: Listeners<SchemeEntity>) {
		const conditions: QueryParams = { all: true }
		return await this.repository.listenToMany(classId, conditions, listener, (entity) => !!entity)
	}

	async update (id: string, factory: SchemeFactory) {
		const data = await factory.toModel()
		return await this.repository.update(data.classId, id, data)
	}

	async markRead (classId: string) {
		return this.repository.markRead(classId)
	}
}
