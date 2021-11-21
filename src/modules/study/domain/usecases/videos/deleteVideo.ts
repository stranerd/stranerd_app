import { IVideoRepository } from '../../irepositories/ivideo'

export class DeleteVideoUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
