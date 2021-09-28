import { isExtractedHTMLLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Keys = {
	title: string; body: string; questionId: string;
}

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		body: { required: true, rules: [isString] },
		questionId: { required: true, rules: [isString] }
	}

	reserved = ['questionId']

	constructor () {
		super({ title: '', body: '', questionId: '' })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get questionId () {
		return this.values.questionId
	}

	set questionId (value: string) {
		this.set('questionId', value)
	}

	loadEntity = (entity: AnswerEntity) => {
		this.title = entity.title
		this.body = entity.body
		this.questionId = entity.questionId
	}

	toModel = async () => {
		if (this.valid) {
			const { title, body, questionId } = this.validValues
			return { title, body, questionId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
