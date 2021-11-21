import { IVideoRepository } from '../../irepositories/ivideo'

export class FindVideoUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
