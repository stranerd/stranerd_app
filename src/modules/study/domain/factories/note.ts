import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { NoteToModel } from '../../data/models/note'
import { NoteEntity } from '../entities/note'

export class NoteFactory extends BaseFactory<NoteEntity, NoteToModel, NoteToModel> {
	readonly rules = {
		title: v.string().min(3),
		content: v.string(),
		isPrivate: v.boolean()
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
