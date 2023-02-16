import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'

export class CommentFactory extends BaseFactory<CommentEntity, Omit<CommentToModel, 'entity'>, Omit<CommentToModel, 'entity'>> {
	readonly rules = {
		body: v.string().min(1)
	}

	reserved = []

	constructor () {
		super({ body: '' })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	loadEntity = (entity: CommentEntity) => {
		this.body = entity.body
	}

	toModel = async () => {
		if (this.valid) {
			const { body } = this.validValues
			return { body }
		} else {
			throw new Error('Validation errors')
		}
	}
}
