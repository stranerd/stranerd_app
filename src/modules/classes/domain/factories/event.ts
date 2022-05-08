import {
	isInvalid,
	isLessThan,
	isLongerThanX,
	isMoreThanOrEqualTo,
	isNumber,
	isString,
	isValid
} from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { EventEntity } from '../entities/event'
import { EventToModel } from '../../data/models/event'
import { Cron, EventDataType, EventType } from '../types'

type Keys = {
	title: string, classId: string, type: EventType,
	scheduledAt: number, start: Cron, end: Cron
}

const isCronValid = (val: any) => {
	const isDayValid = isNumber(val?.day).valid && isMoreThanOrEqualTo(val?.day, 0).valid && isLessThan(val?.day, 7).valid
	const isHourValid = isNumber(val?.hour).valid && isMoreThanOrEqualTo(val?.hour, 0).valid && isLessThan(val?.hour, 24).valid
	const isMinuteValid = isNumber(val?.minute).valid && isMoreThanOrEqualTo(val?.minute, 0).valid && isLessThan(val?.minute, 60).valid
	return [isDayValid, isHourValid, isMinuteValid].every((e) => e) ? isValid() : isInvalid('not a valid cron object')
}

export class EventFactory extends BaseFactory<EventEntity, EventToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(0)] },
		classId: { required: true, rules: [isString] },
		type: { required: true, rules: [isString] },
		scheduledAt: { required: () => this.isOneOffType, rules: [isNumber] },
		start: { required: () => this.isTimetableType, rules: [isCronValid] },
		end: { required: () => this.isTimetableType, rules: [isCronValid] }
	}

	reserved = ['classId', 'type']

	//@ts-ignore
	constructor () {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
		const start: Cron = { day: 1, hour: 8, minute: 0, tz }
		const end: Cron = { day: 1, hour: 10, minute: 0, tz }
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

	get startDay () {
		return this.start.day
	}

	set startDay (value: number) {
		this.start = { ...this.start, day: value }
	}

	get endDay () {
		return this.end.day
	}

	set endDay (value: number) {
		this.end = { ...this.end, day: value }
	}

	get startTime () {
		return `${this.start.hour.toString().padStart(2, '0')}:${this.start.minute.toString().padStart(2, '0')}`
	}

	set startTime (value: string) {
		const [hour, minute] = value.split(':').map(parseInt)
		this.start = { ...this.start, hour, minute }
	}

	get endTime () {
		return `${this.end.hour.toString().padStart(2, '0')}:${this.end.minute.toString().padStart(2, '0')}`
	}

	set endTime (value: string) {
		const [hour, minute] = value.split(':').map(parseInt)
		this.end = { ...this.end, hour, minute }
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
