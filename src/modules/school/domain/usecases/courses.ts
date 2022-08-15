import { ICourseRepository } from '../irepositories/icourse'
import { CourseFactory } from '../factories/course'
import { Conditions, QueryParams } from '@modules/core'
import { PastQuestionType } from '@modules/school'

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

	async getFacultyCourses (facultyId: string, general: boolean) {
		const conditions: QueryParams = {
			where: [{ field: 'facultyId', value: facultyId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (general) conditions.where!.push({ field: 'departmentId', value: null })

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

	async search (search: string) {
		const query: QueryParams = { all: true, search: { value: search, fields: ['name'] } }

		return (await this.repository.get(query)).results
	}
}
