import { IRoleRepository } from '../../irepositories/irole'

export class ToggleVerifiedUseCase {
	private repository: IRoleRepository

	constructor (repository: IRoleRepository) {
		this.repository = repository
	}

	async call (id: string, verified: boolean) {
		return await this.repository.toggleVerified(id, verified)
	}
}
