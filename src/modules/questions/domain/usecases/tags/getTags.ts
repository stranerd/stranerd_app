import { ITagRepository } from '../../irepositories/itag'

export class GetTagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get({
			sort: { field: 'count', order: -1 },
			limit: 18
		})
	}
}
