import { isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { VideoCommentEntity } from '../entities/videoComment'
import { VideoCommentToModel } from '../../data/models/videoComment'

type Keys = { body: string, videoId: string }

export class VideoCommentFactory extends BaseFactory<VideoCommentEntity, VideoCommentToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isLongerThanX(2)] },
		videoId: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ body: '', videoId: '' })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get videoId () {
		return this.values.videoId
	}

	set videoId (value: string) {
		this.set('videoId', value)
	}

	loadEntity = (entity: VideoCommentEntity) => {
		this.body = entity.body
		this.videoId = entity.videoId
	}

	toModel = async () => {
		if (this.valid) {
			const { body, videoId } = this.validValues
			return { body, videoId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
