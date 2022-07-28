import { IWalletRepository } from '../irepositories/iwallet'
import { Listeners } from '@modules/core'
import { WalletEntity } from '../entities/wallet'

export class WalletsUseCase {
	private repository: IWalletRepository

	constructor (repository: IWalletRepository) {
		this.repository = repository
	}

	async get () {
		return await this.repository.get()
	}

	async listen (listener: Listeners<WalletEntity>) {
		return await this.repository.listen(listener)
	}

	async subscribeToPlan (subscriptionId: string) {
		return await this.repository.subscribeToPlan(subscriptionId)
	}

	async cancelSubscription () {
		return await this.repository.cancelSubscription()
	}
}
