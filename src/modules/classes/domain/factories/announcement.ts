import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { AnnouncementToModel } from '../../data/models/announcement'
import { AnnouncementEntity } from '../entities/announcement'

export class AnnouncementFactory extends BaseFactory<AnnouncementEntity, AnnouncementToModel, AnnouncementToModel> {
	readonly rules = {
		body: v.string().min(3, true),
		reminder: v.time().asStamp().nullable(),
		classId: v.string().min(1)
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

	get minDate () {
		const date = new Date()
		return [date.getFullYear(), date.getMonth(), date.getDate()]
			.map((x) => x.toString().padStart(2, '0'))
			.join('-')
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
		const args = value.replaceAll(':', '-').split('-').map((x) => parseInt(x))
		if (args.includes(NaN)) return
		// @ts-ignore
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
