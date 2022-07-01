import { isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { NoteEntity } from '../entities/note'
import { NoteToModel } from '../../data/models/note'

export class NoteFactory extends BaseFactory<NoteEntity, NoteToModel, NoteToModel> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(2)] },
		content: { required: true, rules: [isString] },
		isPrivate: { required: true, rules: [isBoolean] }
	}

	reserved = []

	constructor () {
		super({ title: '', content: '', isPrivate: true })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get content () {
		return this.values.content
	}

	set content (value: string) {
		this.set('content', value)
	}

	get isPrivate () {
		return this.values.isPrivate
	}

	set isPrivate (value: boolean) {
		this.set('isPrivate', value)
	}

	loadEntity = (entity: NoteEntity) => {
		this.title = entity.title
		this.content = entity.content
		this.isPrivate = entity.isPrivate
	}

	toModel = async () => {
		if (this.valid) {
			const { title, content, isPrivate } = this.validValues
			return { title, content, isPrivate }
		} else {
			throw new Error('Validation errors')
		}
	}
}
