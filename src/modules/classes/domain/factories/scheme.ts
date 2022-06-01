import { isLongerThanX, isMoreThan, isMoreThanX, isNumber, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { SchemeEntity } from '../entities/scheme'
import { SchemeToModel } from '../../data/models/scheme'

export class SchemeFactory extends BaseFactory<SchemeEntity, SchemeToModel, SchemeToModel> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(0)] },
		topic: { required: true, rules: [isString, isLongerThanX(0)] },
		start: { required: true, rules: [isNumber, isMoreThanX(0)] },
		end: { required: true, rules: [isNumber, (val: any) => isMoreThan(val, this.start)] },
		classId: { required: true, rules: [isString] }
	}

	reserved = ['classId', 'type']

	constructor () {
		super({ title: '', classId: '', topic: '', start: 0, end: 0 })
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

	get topic () {
		return this.values.topic
	}

	set topic (value: string) {
		this.set('topic', value)
	}

	get start () {
		return this.values.start
	}

	set start (value: number) {
		this.set('start', value)
	}

	get end () {
		return this.values.end
	}

	set end (value: number) {
		this.set('end', value)
	}

	loadEntity = (entity: SchemeEntity) => {
		this.title = entity.title
		this.classId = entity.classId
		this.topic = entity.topic
		this.start = entity.start
		this.end = entity.end
	}

	toModel = async () => {
		if (this.valid) {
			const { title, classId, topic, start, end } = this.validValues
			return { title, classId, topic, start, end }
		} else {
			throw new Error('Validation errors')
		}
	}
}
