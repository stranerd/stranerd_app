import { IMetaRepository } from '../../irepositories/imeta'

export class BuyCoinsWithStripeUseCase {
	private readonly repository: IMetaRepository

	constructor (repository: IMetaRepository) {
		this.repository = repository
	}

	async call (amount: number, currency: string, coins: { gold: number, bronze: number }) {
		return await this.repository.buyCoinsWithStripe({ amount, currency, ...coins })
	}
}
