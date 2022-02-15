import { INotificationRepository } from '../../irepositories/inotification'

export class MarkNotificationSeenUseCase {
	private repository: INotificationRepository

	constructor (repository: INotificationRepository) {
		this.repository = repository
	}

	async call (id: string, seen: boolean) {
		return await this.repository.markSeen(id, seen)
	}
}
