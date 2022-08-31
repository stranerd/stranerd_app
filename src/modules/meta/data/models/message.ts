import { MessageData } from '../../domain/types'

export interface MessageToModel {
	firstName: string
	lastName: string
	email: string
	phone: string
	message: string
	country: string
	data: MessageData
}
