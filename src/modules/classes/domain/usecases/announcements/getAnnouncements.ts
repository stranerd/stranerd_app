import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IAnnouncementRepository } from '../../irepositories/iannouncement'

export class GetAnnouncementsUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (classId: string, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'classId', value: classId }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(conditions)
	}
}
