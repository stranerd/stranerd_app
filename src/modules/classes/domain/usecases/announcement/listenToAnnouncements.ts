import {  Listeners, QueryParams } from '@modules/core'
import { AnnouncementEntity } from '../../entities/announcement'
import { IAnnouncementRepository } from '../../irepositories/iannouncement'


export class ListenToAnnouncementUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (path: string, listener: Listeners<AnnouncementEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
 

