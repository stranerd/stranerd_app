import { IClassRepository } from '../../irepositories/iclass'

export class AcceptRequestUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string, userId: string, accept: boolean) {
		return await this.repository.acceptRequest(id, userId, accept)
	}
}
