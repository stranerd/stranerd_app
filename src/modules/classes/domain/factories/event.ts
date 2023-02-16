import { BaseFactory } from '@modules/core'
import { makeRule, v, isValid, isInvalid, isNumber } from 'valleyed'
import { EventToModel } from '../../data/models/event'
import { EventEntity } from '../entities/event'
import { Cron, EventDataType, EventType, getCronOrder } from '../types'

type Keys = {
	title: string, classId: string, type: EventType, announcementId: string | null
	scheduledAt: number, start: Cron, end: Cron, lecturer: string
}

const isCronValid = () => makeRule<Cron>((value) => {
	const val = value as Cron
	const { valid } = v.object({
		day: v.number().gte(0).lte(6),
		hour: v.number().gte(0).lte(23),
		minute: v.number().gte(0).lte(59),
		tz: v.string().custom((tz: string) => {
			try {
				Intl.DateTimeFormat(undefined, { timeZone: tz })
				return true
			} catch (ex) {
				return false
			}
		})
	}).parse(val)
	return valid ? isValid(val) : isInvalid(['not a valid cron object'], val)
})

const isCronMore = (start: any) => makeRule<Cron>((val: any) =>
	getCronOrder(val) >= getCronOrder(start) ? isValid(val) : isInvalid(['must be after start'], val))
export class EventFactory extends BaseFactory<EventEntity, EventToModel, Keys> {
	readonly rules = {
		title: v.string().min(1),
		classId: v.string().min(1),
		type: v.any<EventType>().in(Object.values(EventType)),
		scheduledAt: v.time().asStamp().requiredIf(() => this.isOneOffType),
		announcementId: v.string().min(1).nullable().requiredIf(() => this.isOneOffType),
		start: v.any<Cron>().requiredIf(() => this.isTimetableType).addRule(isCronValid()),
		end: v.any<Cron>().requiredIf(() => this.isTimetableType)
			.addRule(isCronValid()).addRule(isCronMore(this.start)),
		lecturer: v.string().min(1).requiredIf(() => this.isTimetableType)
	}

	reserved = ['classId', 'type']

	//@ts-ignore
	constructor () {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
		const start: Cron = { day: 1, hour: 8, minute: 0, tz }
		const end: Cron = { day: 1, hour: 10, minute: 0, tz }
		super({
			title: '',
			classId: '',
			type: EventType.timetable,
			scheduledAt: Date.now(),
			announcementId: null,
			start,
			end,
			lecturer: ''
		})
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
		const [hour, minute] = value.split(':').map((x) => parseInt(x))
		if (!isNumber()(hour).valid || !isNumber()(minute).valid) return
		this.start = { ...this.start, hour, minute }
	}

	get endTime () {
		return `${this.end.hour.toString().padStart(2, '0')}:${this.end.minute.toString().padStart(2, '0')}`
	}

	set endTime (value: string) {
		const [hour, minute] = value.split(':').map((x) => parseInt(x))
		if (!isNumber()(hour).valid || !isNumber()(minute).valid) return
		this.end = { ...this.end, hour, minute }
	}

	get end () {
		return this.values.end
	}

	set end (value: Cron) {
		this.set('end', value)
	}

	get lecturer () {
		return this.values.lecturer
	}

	set lecturer (value: string) {
		this.set('lecturer', value)
	}

	get announcementId () {
		return this.values.announcementId
	}

	set announcementId (value: string | null) {
		this.set('announcementId', value)
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
			this.lecturer = entity.data.lecturer
			this.start = entity.data.start
			this.end = entity.data.end
		} else {
			this.scheduledAt = entity.data.scheduledAt
			this.announcementId = entity.data.announcementId
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { title, classId, type, start, end, scheduledAt, announcementId, lecturer } = this.validValues
			return {
				title, classId,
				data: (this.isTimetableType ? { type, start, end, lecturer } : {
					type,
					scheduledAt,
					announcementId
				}) as EventDataType
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
