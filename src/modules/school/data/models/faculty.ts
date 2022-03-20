export interface FacultyFromModel extends FacultyToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface FacultyToModel {
	name: string
	institutionId: string
}
