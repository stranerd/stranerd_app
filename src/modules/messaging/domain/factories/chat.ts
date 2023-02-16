import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { v } from 'valleyed'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

type Content = Media | UploadedFile | null
type Keys = { body: string, to: string, media: Content | null }

export class ChatFactory extends BaseFactory<ChatEntity, ChatToModel, Keys> {
	readonly rules = {
		body: v.string(),
		to: v.string().min(1),
		media: v.file().nullable()
	}

	reserved = ['to']

	constructor () {
		super({ body: '', to: '', media: null })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
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
