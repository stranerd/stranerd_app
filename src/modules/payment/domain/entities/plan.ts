import { BaseEntity } from '@modules/core'
import { Currencies, PlanData } from '../types'

export class PlanEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly interval: string
	public readonly active: boolean
	public readonly amount: number
	public readonly currency: Currencies
	public readonly data: PlanData
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             amount,
		             currency,
		             name,
		             interval,
		             active,
		             data,
		             createdAt,
		             updatedAt
	             }: PlanConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.interval = interval
		this.active = active
		this.amount = amount
		this.currency = currency
		this.data = data
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get features () {
		return [
			{ name: 'Flashcards', available: this.data.flashCards },
			{ name: 'Assignment Help', available: this.data.questions }
		]
	}

	get featuresDescription () {
		const res = ['Creating and using flashcards']
		if (this.data.questions) {
			res.push(
				`Only ${this.data.questions} questions to ask`,
				'Expert answers to all question you ask',
				'Unlimited access to all questions answer'
			)
		}
		return res
	}

	get isFree () {
		return this.amount === 0
	}
}

type PlanConstructorArgs = {
	id: string
	name: string
	amount: number
	active: boolean
	currency: Currencies
	interval: string
	data: PlanData
	createdAt: number
	updatedAt: number
}
