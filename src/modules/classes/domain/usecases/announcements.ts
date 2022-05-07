import { IAnnouncementRepository } from '../irepositories/iannouncement'
import { AnnouncementFactory } from '../factories/announcement'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { AnnouncementEntity } from '../entities/announcement'

export class AnnouncementsUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async add (factory: AnnouncementFactory) {
		const data = await factory.toModel()
		return await this.repository.add(data.classId, data)
	}

	async delete (classId: string, id: string) {
		return await this.repository.delete(classId, id)
	}

	async find (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}

	async getClassAnnouncements (classId: string, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(classId, conditions)
	}

	async listenToOne (classId: string, id: string, listener: Listeners<AnnouncementEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}

	async listenToClassAnnouncements (classId: string, listener: Listeners<AnnouncementEntity>, date?: number) {
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

	async update (id: string, factory: AnnouncementFactory) {
		const data = await factory.toModel()
		return await this.repository.update(data.classId, id, data)
	}
}
