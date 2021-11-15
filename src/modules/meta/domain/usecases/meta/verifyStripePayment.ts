import { IMetaRepository } from '../../irepositories/imeta'

export class VerifyStripePaymentUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (intentId: string) {
		return await this.repository.verifyStripePayment({ intentId })
	}
}
