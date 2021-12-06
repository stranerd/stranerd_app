import { arrayContainsX, isLongerThanX, isRequiredIfX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { CommentEntity, CommentType } from '../entities/comment'
import { CommentToModel } from '../../data/models/comment'

type Keys = {
	body: string
	type: CommentType
	videoId: string
}

export class CommentFactory extends BaseFactory<CommentEntity, CommentToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isLongerThanX(2)] },
		type: { required: true, rules: [arrayContainsX(Object.values(CommentType), (cur, val) => cur === val)] },
		videoId: { required: false, rules: [isRequiredIfX(this.isVideoType), isString, isLongerThanX(0)] }
	}

	reserved = ['type']

	constructor (type: CommentType) {
		super({ body: '', type, videoId: '' })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: CommentType) {
		this.set('type', value)
	}

	get videoId () {
		return this.values.videoId
	}

	set videoId (value: string) {
		this.set('videoId', value)
	}

	get isVideoType () {
		return this.type === CommentType.video
	}

	loadEntity = (entity: CommentEntity) => {
		this.body = entity.body
		this.type = entity.data.type
		if (entity.data.type === CommentType.video) {
			this.videoId = entity.data.videoId
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { body, type, videoId } = this.validValues
			return {
				body,
				data: this.isVideoType ? { type, videoId } : ({} as any)
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
