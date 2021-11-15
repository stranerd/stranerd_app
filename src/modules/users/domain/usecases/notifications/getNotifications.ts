import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { INotificationRepository } from '../../irepositories/inotification'

export class GetNotificationsUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]
		return await this.repository.get(userId, conditions)
	}
}
