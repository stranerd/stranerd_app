import { Listeners } from '@modules/core'
import { IWalletRepository } from '../../domain/irepositories/iwallet'
import { WalletEntity } from '../../domain/entities/wallet'
import { WalletBaseDataSource } from '../datasources/walletBase'
import { WalletTransformer } from '../transformers/wallet'
import { AccountDetails, CurrencyCountries } from '../../domain/types'

export class WalletRepository implements IWalletRepository {
	private dataSource: WalletBaseDataSource
	private transformer: WalletTransformer

	constructor (dataSource: WalletBaseDataSource, transformer: WalletTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get () {
		const model = await this.dataSource.get()
		return this.transformer.fromJSON(model)
	}

	async listen (listener: Listeners<WalletEntity>) {
		return this.dataSource.listen({
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}

	async subscribeToPlan (planId: string) {
		const model = await this.dataSource.subscribeToPlan(planId)
		return this.transformer.fromJSON(model)
	}

	async cancelSubscription () {
		const model = await this.dataSource.cancelSubscription()
		return this.transformer.fromJSON(model)
	}

	async getBanks (country: CurrencyCountries) {
		return await this.dataSource.getBanks(country)
	}

	async updateAccount (account: AccountDetails) {
		const model = await this.dataSource.updateAccount(account)
		return this.transformer.fromJSON(model)
	}
}
