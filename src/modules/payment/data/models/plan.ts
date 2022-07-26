import { Currencies, PlanData } from '../../domain/types'

export interface PlanFromModel {
	id: string
	amount: number
	currency: Currencies
	name: string
	interval: string
	active: boolean
	data: PlanData
	createdAt: number
	updatedAt: number
}
