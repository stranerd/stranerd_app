export interface CourseFromModel extends CourseToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface CourseToModel {
	name: string
	institutionId: string
}
