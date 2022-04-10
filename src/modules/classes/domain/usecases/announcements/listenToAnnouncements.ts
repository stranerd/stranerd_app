import { Conditions, Listeners, QueryParams } from '@modules/core'
import { AnnouncementEntity } from '../../entities/announcement'
import { IAnnouncementRepository } from '../../irepositories/iannouncement'

export class ListenToAnnouncementsUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (classId: string, listener: Listeners<AnnouncementEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => {
			if (entity.classId !== classId) return false
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
