import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isFile, isLongerThanX, isString } from '@stranerd/validate'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

type Content = Media | UploadedFile | null
type Keys = { content: string, to: string, sessionId: string | null, media: Content | null }

export class ChatFactory extends BaseFactory<ChatEntity, ChatToModel, Keys> {
	readonly rules = {
		content: { required: true, nullable: true, rules: [isString, isLongerThanX(0)] },
		to: { required: true, rules: [isString, isLongerThanX(0)] },
		sessionId: { required: true, nullable: true, rules: [isString, isLongerThanX(0)] },
		media: { required: true, rules: [isFile] }
	}

	reserved = ['to']

	constructor () {
		super({ content: '', to: '', media: null, sessionId: null })
	}

	get content () {
		return this.values.content
	}

	set content (value: string | null) {
		this.set('content', value)
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

	get sessionId () {
		return this.values.sessionId
	}

	set sessionId (value: string | null) {
		this.set('sessionId', value)
	}

	toModel = async () => {
		if (this.valid) {
			const { to, content, media, sessionId } = this.validValues
			return {
				to, content, sessionId,
				media: media as Media ?? null
			}
		} else {
			throw new Error('Validation errors')
		}
	}

	loadEntity = (entity: ChatEntity) => {
		this.content = entity.content
		this.media = entity.media
		this.to = entity.to
		this.sessionId = entity.sessionId
	}
}
