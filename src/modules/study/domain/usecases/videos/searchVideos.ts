import { IVideoRepository } from '../../irepositories/ivideo'

export class SearchVideosUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['title', 'description'] }
		})
	}
}
