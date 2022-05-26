import { IEventRepository } from '../irepositories/ievent'
import { EventFactory } from '../factories/event'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { EventEntity } from '../entities/event'
import { EventType } from '@modules/classes/domain/types'

export class EventsUseCase {
	private repository: IEventRepository

	constructor (repository: IEventRepository) {
		this.repository = repository
	}

	async add (factory: EventFactory) {
		const data = await factory.toModel()
		return await this.repository.add(data.classId, data)
	}

	async delete (classId: string, id: string) {
		return await this.repository.delete(classId, id)
	}

	async find (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}

	async getClassTimetable (classId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'data.type', value: EventType.timetable }],
			all: true
		}

		return await this.repository.get(classId, conditions)
	}

	async getClassOneOffEvents (classId: string, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'data.type', value: EventType.oneOff }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(classId, conditions)
	}

	async listenToOne (classId: string, id: string, listener: Listeners<EventEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}

	async listenToClassTimetable (classId: string, listener: Listeners<EventEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'data.type', value: EventType.timetable }],
			all: true
		}

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => entity.data.type === EventType.timetable)
	}

	async listenToClassOneOffEvents (classId: string, listener: Listeners<EventEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'data.type', value: EventType.oneOff }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => {
			if (entity.classId !== classId) return false
			if (entity.data.type !== EventType.oneOff) return false
			if (date) return entity.createdAt >= date
			return true
		})
	}

	async update (id: string, factory: EventFactory) {
		const data = await factory.toModel()
		return await this.repository.update(data.classId, id, data)
	}

	async markRead (classId: string) {
		return this.repository.markRead(classId)
	}
}
