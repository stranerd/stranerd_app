import { Conditions, QueryParams } from '@modules/core'
import { INoteRepository } from '../../irepositories/inote'

export class GetNotesInSetUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
