import { INotificationRepository } from '../../irepositories/inotification'

export class MarkNotificationSeenUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (userId: string, id: string, seen: boolean) {
		return await this.repository.markSeen(userId, id, seen)
	}
}
