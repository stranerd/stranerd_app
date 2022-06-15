import { isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { CommentEntity } from '../entities/comment'
import { CommentToModel } from '../../data/models/comment'

export class CommentFactory extends BaseFactory<CommentEntity, Omit<CommentToModel, 'entity'>, Omit<CommentToModel, 'entity'>> {
	readonly rules = {
		body: { required: true, rules: [isString, isLongerThanX(0)] }
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
