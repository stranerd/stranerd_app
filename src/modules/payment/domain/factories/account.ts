import { BaseFactory } from '@modules/core'
import { CurrencyCountries, WalletEntity } from '@modules/payment'
import { AccountDetails } from '@modules/payment/domain/types'
import { v } from 'valleyed'

export class WalletAccountFactory extends BaseFactory<WalletEntity, AccountDetails, AccountDetails> {
	readonly rules = {
		country: v.any<CurrencyCountries>().in(Object.values(CurrencyCountries)),
		number: v.string().min(1),
		bankCode: v.string().min(1),
		bankName: v.string()
	}

	reserved = []

	constructor () {
		super({ country: CurrencyCountries.NG, number: '', bankCode: '', bankName: '' })
	}

	get country () {
		return this.values.country
	}

	set country (value: CurrencyCountries) {
		this.set('country', value)
	}

	get number () {
		return this.values.number
	}

	set number (value: string) {
		this.set('number', value)
	}

	get bankCode () {
		return this.values.bankCode
	}

	set bankCode (value: string) {
		this.set('bankCode', value)
	}

	get bankName () {
		return this.values.bankName
	}

	set bankName (value: string) {
		this.set('bankName', value)
	}

	loadEntity = (entity: WalletEntity) => {
		if (entity.account) {
			this.country = entity.account.country
			this.number = entity.account.number
			this.bankCode = entity.account.bankCode
			this.bankName = entity.account.bankName
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { country, number, bankCode, bankName } = this.validValues
			return { country, number, bankCode, bankName }
		} else {
			throw new Error('Validation errors')
		}
	}
}
