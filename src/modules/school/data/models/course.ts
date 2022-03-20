export interface CourseFromModel extends CourseToModel {
	id: string
	facultyId: string | null
	createdAt: number
	updatedAt: number
}

export interface CourseToModel {
	name: string
	institutionId: string
	departmentId: string | null
}
