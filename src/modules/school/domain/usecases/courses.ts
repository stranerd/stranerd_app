import { ICourseRepository } from '../irepositories/icourse'
import { CourseFactory } from '../factories/course'
import { QueryParams } from '@modules/core'

export class CoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async add (factory: CourseFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: CourseFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async getDepartmentCourses (departmentId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'departmentId', value: departmentId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async getInstitutionCourses (institutionId: string, general: boolean) {
		const conditions: QueryParams = {
			where: [{ field: 'institutionId', value: institutionId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (general) conditions.where!.push({ field: 'facultyId', value: null })

		return await this.repository.get(conditions)
	}
}
