export interface NotificationFromModel extends NotificationToModel {
	id: string
	userId: string
	createdAt: number
	updatedAt: number
}

export interface NotificationToModel {
	body: string
	seen: boolean
	action: string
	data: Record<string, any>
}
