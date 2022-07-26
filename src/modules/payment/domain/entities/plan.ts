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
			{ name: 'Class', available: true },
			{ name: 'Flashcards', available: true },
			{ name: 'File storage', available: true },
			{ name: 'Answer a question', available: true },
			{ name: 'Ask a question', available: !!this.id },
			{ name: 'Answers', available: !!this.id },
			{ name: 'Student connect', available: !!this.id }
		]
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
