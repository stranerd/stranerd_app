import { IRoleRepository } from '../../irepositories/irole'

export class ToggleAdminUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (id: string, admin: boolean) {
		return await this.repository.toggleAdmin(id, admin)
	}
}
