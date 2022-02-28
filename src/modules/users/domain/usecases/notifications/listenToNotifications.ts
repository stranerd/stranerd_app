import { Conditions, Listeners, QueryParams } from '@modules/core'
import { INotificationRepository } from '../../irepositories/inotification'
import { NotificationEntity } from '../../entities/notification'

export class ListenToNotificationsUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<NotificationEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			else return true
		})
	}
}
