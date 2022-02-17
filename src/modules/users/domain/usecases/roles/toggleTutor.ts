import { IRoleRepository } from '../../irepositories/irole'

export class ToggleTutorUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (id: string, tutor: boolean) {
		return await this.repository.toggleTutor(id, tutor)
	}
}
