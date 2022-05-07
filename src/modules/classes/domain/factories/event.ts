import { isExtractedHTMLLongerThanX, isNumber, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { EventEntity } from '../entities/event'
import { EventToModel } from '../../data/models/event'
import { Cron, EventDataType, EventType } from '../types'

type Keys = {
	title: string, classId: string, type: EventType,
	scheduledAt: number, start: Cron, end: Cron
}

const start: Cron = { day: 1, hour: 8, minute: 0, tz: '' }
const end: Cron = { day: 1, hour: 10, minute: 0, tz: '' }

export class EventFactory extends BaseFactory<EventEntity, EventToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		classId: { required: true, rules: [isString] },
		type: { required: true, rules: [isString] },
		scheduledAt: { required: () => this.isOneOffType, rules: [isNumber] },
		start: { required: () => this.isTimetableType, rules: [] },
		end: { required: () => this.isTimetableType, rules: [] }
	}

	reserved = ['classId']

	constructor () {
		super({ title: '', classId: '', type: EventType.timetable, scheduledAt: Date.now(), start, end })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get classId () {
		return this.values.classId
	}

	set classId (value: string) {
		this.set('classId', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: EventType) {
		this.set('type', value)
	}

	get isTimetableType () {
		return this.type === EventType.timetable
	}

	get isOneOffType () {
		return this.type === EventType.oneOff
	}

	get start () {
		return this.values.start
	}

	set start (value: Cron) {
		this.set('start', value)
	}

	get end () {
		return this.values.end
	}

	set end (value: Cron) {
		this.set('end', value)
	}

	get scheduledAt () {
		return this.values.scheduledAt
	}

	set scheduledAt (value: number) {
		this.set('scheduledAt', value)
	}

	loadEntity = (entity: EventEntity) => {
		this.title = entity.title
		this.classId = entity.classId
		this.type = entity.data.type
		if (entity.data.type === EventType.timetable) {
			this.start = entity.data.start
			this.end = entity.data.end
		} else this.scheduledAt = entity.data.scheduledAt
	}

	toModel = async () => {
		if (this.valid) {
			const { title, classId, type, start, end, scheduledAt } = this.validValues
			return {
				title, classId,
				data: (this.isTimetableType ? { type, start, end } : { type, scheduledAt }) as EventDataType
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
