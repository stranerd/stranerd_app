import { BaseFactory } from '@modules/core'
import { arrayContainsX, isLongerThanX, isString } from '@stranerd/validate'
import { ReportToModel } from '../../data/models/report'
import { ReportEntity, ReportType } from '../entities/report'

type Keys = { id: string, type: ReportType, message: string }

export class ReportFactory extends BaseFactory<ReportEntity, ReportToModel, Keys> {
	public rules = {
		type: {
			required: true,
			rules: [isString, arrayContainsX(Object.values<string>(ReportType), (cur, val) => cur === val)]
		},
		id: { required: true, rules: [isString, isLongerThanX(0)] },
		message: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = ['type', 'id', 'message']

	constructor (type: ReportType, id: string) {
		super({ id, type, message: '' })
	}

	get message () {
		return this.values.message
	}

	set message (value: string) {
		this.set('message', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: ReportType) {
		this.set('type', value)
	}

	get id () {
		return this.values.id
	}

	set id (value: string) {
		this.set('id', value)
	}

	get title () {
		return {
			[ReportType.users]: 'User',
			[ReportType.questions]: 'Question',
			[ReportType.answers]: 'Answer',
			[ReportType.pastQuestions]: 'Past Question',
			[ReportType.flashCards]: 'Flashcard'
		}[this.type] ?? ''
	}

	public toModel = async () => {
		if (this.valid) {
			const { type, id, message } = this.validValues
			return { entity: { type, id }, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ReportEntity) => {
		this.id = entity.entity.id
		this.type = entity.entity.type
		this.message = entity.message
	}
}
