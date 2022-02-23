import {  Listeners, QueryParams } from '@modules/core'
import { ClassEntity } from '../../entities/class'
import { IClassRepository } from '../../irepositories/iclass'

export class ListenToClassUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (path: string, listener: Listeners<ClassEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		return await this.repository.listenToOne(path,  listener)
	}
}
