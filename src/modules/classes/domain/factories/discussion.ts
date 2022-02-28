import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isFile, isLongerThanX, isString } from '@stranerd/validate'
import { DiscussionToModel } from '../../data/models/discussion'
import { DiscussionEntity } from '../entities/discussion'

type Content = UploadedFile | Media | null
type Keys = { content: string | null, groupId: string, media: Content | null }

export class DiscussionFactory extends BaseFactory<DiscussionEntity, DiscussionToModel, Keys> {
	readonly rules = {
		content: { required: () => !this.media, rules: [isString, isLongerThanX(0)] },
		groupId: { required: false, rules: [isString] },
		media: { required: () => !this.content, rules: [isFile] }
	}

	reserved = []

	constructor () {
		super({ content: null, media: null, groupId: '' })
	}

	get content () {
		return this.values.content
	}

	set content (value: string | null) {
		this.set('content', value)
	}

	get media () {
		return this.values.media
	}

	set media (value: Content) {
		this.set('media', value)
	}

	get groupId () {
		return this.values.groupId
	}

	set groupId (value: string | null) {
		this.set('groupId', value)
	}

	toModel = async () => {
		if (this.valid) {
			if (this.media instanceof UploadedFile) this.media = await this.uploadFile('classes/discussions', this.media)
			const { content, media, groupId } = this.validValues
			return { content, groupId, media: media as Media ?? null }
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: DiscussionEntity) => {
		this.content = entity.content
		this.media = entity.media
		this.groupId = entity.groupId
	}
}
