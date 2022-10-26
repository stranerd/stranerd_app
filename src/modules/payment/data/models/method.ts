import { MethodData } from '@modules/payment/domain/types'

export interface MethodFromModel {
	id: string
	userId: string
	token: string
	data: MethodData
	primary: boolean
	createdAt: number
	updatedAt: number
}
