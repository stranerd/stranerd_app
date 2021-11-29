import { Conditions, QueryParams } from '@modules/core'
import { IVideoRepository } from '../../irepositories/ivideo'

export class GetVideosInSetUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
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
