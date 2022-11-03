import { IWalletRepository } from '../irepositories/iwallet'
import { Listeners } from '@modules/core'
import { WalletEntity } from '../entities/wallet'
import { CurrencyCountries } from '../types'
import { WalletAccountFactory } from '../factories/account'

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

	async subscribeToPlan (planId: string) {
		return await this.repository.subscribeToPlan(planId)
	}

	async cancelSubscription () {
		return await this.repository.cancelSubscription()
	}

	async getBanks (country: CurrencyCountries) {
		return await this.repository.getBanks(country)
	}

	async updateAccount (factory: WalletAccountFactory) {
		return await this.repository.updateAccount(await factory.toModel())
	}
}
