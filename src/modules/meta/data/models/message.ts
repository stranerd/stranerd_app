import { Phone } from '@modules/auth'
import { MessageData } from '../../domain/types'

export interface MessageToModel {
	firstName: string;
	lastName: string;
	email: string;
	phone: Phone;
	message: string;
	country: string;
	data: MessageData;
}
