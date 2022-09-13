import { BaseEntity } from '@modules/core'
import { Currencies, PlanData, PlanFeatures } from '../types'

export class PlanEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly interval: string
	public readonly active: boolean
	public readonly amount: number
	public readonly currency: Currencies
	public readonly data: PlanData
	public readonly features: PlanFeatures
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
		             features,
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
		this.features = features
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get featuresList () {
		return [
			{ name: 'Classroom', available: this.features.classes },
			{ name: 'Flashcards', available: this.features.flashCards },
			{ name: 'Homework Help', available: this.features.homework },
			{ name: 'Stranerd Connect', available: this.features.connect },
			{ name: 'Practice Tests', available: this.features.tests },
			{ name: 'Past Question Solutions', available: this.features.solutions },
			{ name: 'Solution Manuals', available: this.features.manuals }
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
	features: PlanFeatures
	createdAt: number
	updatedAt: number
}
