export interface ReferralToModel {
	referred: string
}


export interface ReferralFromModel extends ReferralToModel {
	id: string
	userId: string
	createdAt: number
	updatedAt: number
}

