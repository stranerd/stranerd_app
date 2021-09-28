import { IRoleRepository } from '../../irepositories/irole'

export class MakeAdminUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.toggleAdmin(id, true)
	}
}
