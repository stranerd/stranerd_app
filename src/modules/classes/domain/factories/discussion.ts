import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isFile, isLongerThanX, isString } from '@stranerd/validate'
import { DiscussionToModel } from '../../data/models/discussion'
import { DiscussionEntity } from '../entities/discussion'

type Content = UploadedFile | Media | null
type Keys = { content: string, groupId: string, media: Content | null }

export class DiscussionFactory extends BaseFactory<DiscussionEntity, DiscussionToModel, Keys> {
	readonly rules = {
		content: { required: true, rules: [isString] },
		groupId: { required: false, rules: [isString, isLongerThanX(0)] },
		media: { required: false, rules: [isFile] }
	}

	reserved = ['groupId']

	constructor () {
		super({ content: '', media: null, groupId: '' })
	}

	get content () {
		return this.values.content
	}

	set content (value: string) {
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

	set groupId (value: string) {
		this.set('groupId', value)
	}

	toModel = async () => {
		if (this.valid) {
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
