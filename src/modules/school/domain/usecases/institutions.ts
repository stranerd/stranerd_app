import { IInstitutionRepository } from '../irepositories/iinstitution'
import { InstitutionFactory } from '../factories/institution'
import { QueryParams } from '@modules/core'

export class InstitutionsUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async add (factory: InstitutionFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: InstitutionFactory) {
		return await this.repository.update(id, await factory.toModel())
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
}
