import { IClassRepository } from '../../irepositories/iclass'

export class LeaveClassUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.leaveClass(id)
	}
}
