import { arrayContainsX, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { CurrencyCountries, WalletEntity } from '@modules/payment'
import { AccountDetails } from '@modules/payment/domain/types'

export class WalletAccountFactory extends BaseFactory<WalletEntity, AccountDetails, AccountDetails> {
	readonly rules = {
		country: {
			required: true,
			rules: [arrayContainsX(Object.keys(CurrencyCountries), (cur, val) => cur === val)]
		},
		number: { required: true, rules: [isString, isLongerThanX(0)] },
		bankCode: { required: true, rules: [isString, isLongerThanX(0)] },
		bankName: { required: true, rules: [isString] }
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
