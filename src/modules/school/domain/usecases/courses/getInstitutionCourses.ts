import { QueryParams } from '@modules/core'
import { ICourseRepository } from '../../irepositories/icourse'

export class GetInstitutionCoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (institutionId: string, general: boolean) {
		const conditions: QueryParams = {
			where: [{ field: 'institutionId', value: institutionId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		if (general) conditions.where!.push({ field: 'facultyId', value: null })

		return await this.repository.get(conditions)
	}
}
