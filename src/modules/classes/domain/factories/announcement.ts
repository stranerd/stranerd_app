import { isExtractedHTMLLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { AnnouncementEntity } from '../entities/announcement'
import { AnnouncementToModel } from '../../data/models/announcement'

export class AnnouncementFactory extends BaseFactory<AnnouncementEntity, AnnouncementToModel, AnnouncementToModel> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		classId: { required: true, rules: [isString] }
	}

	reserved = []

	constructor () {
		super({ body: '', classId: '' })
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

	loadEntity = (entity: AnnouncementEntity) => {
		this.body = entity.body
		this.classId = entity.classId
	}

	toModel = async () => {
		if (this.valid) {
			const { body, classId } = this.validValues
			return { body, classId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
