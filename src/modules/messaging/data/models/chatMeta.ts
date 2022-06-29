import { ChatFromModel } from './chat'
import { ChatMetaData } from '../../domain/types'

export interface ChatMetaFromModel {
	id: string
	last: ChatFromModel | null
	members: string[],
	data: ChatMetaData
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}
