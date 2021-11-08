export interface SubjectFromModel extends SubjectToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface SubjectToModel {
	name: string
}
