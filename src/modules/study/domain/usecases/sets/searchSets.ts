import { ISetRepository } from '../../irepositories/iset'

export class SearchSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['name'] }
		})
	}
}
