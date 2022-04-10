import { Listeners } from '@modules/core'
import { AnnouncementEntity } from '../../entities/announcement'
import { IAnnouncementRepository } from '../../irepositories/iannouncement'

export class ListenToAnnouncementUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (classId: string, id: string, listener: Listeners<AnnouncementEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}
}
