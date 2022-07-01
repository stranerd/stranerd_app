import { isExtractedHTMLLongerThanX, isNumber, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { AnnouncementEntity } from '../entities/announcement'
import { AnnouncementToModel } from '../../data/models/announcement'

export class AnnouncementFactory extends BaseFactory<AnnouncementEntity, AnnouncementToModel, AnnouncementToModel> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		reminder: { required: true, nullable: true, rules: [isNumber] },
		classId: { required: true, rules: [isString] }
	}

	reserved = ['classId']

	constructor () {
		super({ body: '', classId: '', reminder: null })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get classId () {
		return this.values.classId
	}

	set classId (value: string) {
		this.set('classId', value)
	}

	get reminder () {
		return this.values.reminder
	}

	set reminder (value: number | null) {
		this.set('reminder', value)
	}

	get reminderDate () {
		const date = new Date(this.reminder ?? Date.now())
		return [date.getFullYear(), date.getMonth(), date.getDate()]
			.map((x) => x.toString().padStart(2, '0'))
			.join('-')
	}

	set reminderDate (value: string) {
		this.setReminder([value, this.reminderTime].join('-'))
	}

	get reminderTime () {
		const date = new Date(this.reminder ?? Date.now())
		return [date.getHours(), date.getMinutes()]
			.map((x) => x.toString().padStart(2, '0'))
			.join(':')
	}

	set reminderTime (value: string) {
		this.setReminder([this.reminderDate, value].join('-'))
	}

	setReminder (value: string) {
		const args = value.replaceAll(':', '-').split('-').map(parseInt)
		//@ts-ignore
		this.reminder = new Date(...args).getTime()
	}

	loadEntity = (entity: AnnouncementEntity) => {
		this.body = entity.body
		this.classId = entity.classId
		this.reminder = entity.reminder
	}

	toModel = async () => {
		if (this.valid) {
			const { body, classId, reminder } = this.validValues
			return { body, classId, reminder }
		} else {
			throw new Error('Validation errors')
		}
	}
}
