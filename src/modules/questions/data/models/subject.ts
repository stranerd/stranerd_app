export interface SubjectToModel {
	name: string
}

export interface SubjectFromModel extends SubjectToModel {
	id: string
	createdAt: number
	updatedAt: number
}


