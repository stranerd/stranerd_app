import { IAuthRepository } from '../../irepositories/iauth'

export class CompleteEmailVerificationUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (token: string) {
		return await this.repository.completeEmailVerification(token)
	}
}
