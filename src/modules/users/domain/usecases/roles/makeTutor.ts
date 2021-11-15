import { IRoleRepository } from '../../irepositories/irole'

export class MakeTutorUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.toggleTutor(id, true)
	}
}
