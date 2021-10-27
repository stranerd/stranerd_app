import { IRoleRepository } from '../../irepositories/irole'

export class RemoveTutorUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.toggleTutor(id, false)
	}
}
