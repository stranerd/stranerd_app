import { IClassRepository } from '../../irepositories/iclass'

export class RequestClassUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string, request: boolean) {
		return await this.repository.requestClass(id, request)
	}
}
