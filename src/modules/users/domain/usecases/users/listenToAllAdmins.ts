import { Listeners } from '@modules/core'
import { appName } from '@utils/environment'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'

export class ListenToAllAdminsUseCase {
	private repository: IUserRepository

	constructor(repository: IUserRepository) {
		this.repository = repository
	}

	async call(listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			where: [ { field: `roles.${ appName }.isAdmin`, value: true } ],
			all: true
		}, listener, (entity) => entity.roles[appName].isAdmin)
	}
}
