import { IMetaRepository } from '../../irepositories/imeta'

export class SearchUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (search: string) {
		return await this.repository.search(search)
	}
}
