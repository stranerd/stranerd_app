export interface MessageFromModel extends MessageToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface MessageToModel {
	firstName: string
	lastName: string
	email: string
	message: string
}
