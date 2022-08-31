export interface DepartmentFromModel extends DepartmentToModel {
	id: string
	institutionId: string
	createdAt: number
	updatedAt: number
}

export interface DepartmentToModel {
	name: string
	facultyId: string
	tagId: string
}
