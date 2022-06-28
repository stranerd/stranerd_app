import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isFile, isLongerThanX, isString } from '@stranerd/validate'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

type Content = Media | UploadedFile | null
type Keys = { body: string, to: string, media: Content | null }

export class ChatFactory extends BaseFactory<ChatEntity, ChatToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString] },
		to: { required: true, rules: [isString, isLongerThanX(0)] },
		media: { required: true, nullable: true, rules: [isFile] }
	}

	reserved = ['to']

	constructor () {
		super({ body: '', to: '', media: null })
	}

	get body () {
		return this.values.body
	}

	set body (value: string | null) {
		this.set('body', value)
	}

	get to () {
		return this.values.to
	}

	set to (value: string) {
		this.set('to', value)
	}

	get media () {
		return this.values.media
	}

	set media (value: Content) {
		this.set('media', value)
	}

	toModel = async () => {
		if (this.valid) {
			const { to, body, media } = this.validValues
			return { to, body, media: media as Media ?? null }
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: ChatEntity) => {
		this.body = entity.body
		this.media = entity.media
		this.to = entity.to
	}
}
