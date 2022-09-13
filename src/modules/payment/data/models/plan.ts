import { Currencies, PlanData, PlanFeatures } from '../../domain/types'

export interface PlanFromModel {
	id: string
	amount: number
	currency: Currencies
	name: string
	interval: string
	active: boolean
	data: PlanData
	features: PlanFeatures
	createdAt: number
	updatedAt: number
}
