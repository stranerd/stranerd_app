export interface ReferralFromModel extends ReferralToModel {
	id: string
	userId: string
	createdAt: number
	updatedAt: number
}

export interface ReferralToModel {
	referred: string
}
