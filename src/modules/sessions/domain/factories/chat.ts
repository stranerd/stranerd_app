import { BaseFactory, Media } from '@modules/core'
import { isFile, isLongerThanX, isRequiredIf, isString } from '@stranerd/validate'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

type Content = Media | File | null
type Keys = { content: string | null, to: string, sessionId: string | null, media: Content | null }

export class ChatFactory extends BaseFactory<ChatEntity, ChatToModel, Keys> {
	readonly rules = {
		content: { required: false, rules: [(val: any) => isRequiredIf(val, !this.media), isString, isLongerThanX(0)] },
		to: { required: true, rules: [isString, isLongerThanX(0)] },
		sessionId: { required: false, rules: [isString, isLongerThanX(0)] },
		media: { required: false, rules: [(val: any) => isRequiredIf(val, !this.content), isFile] }
	}

	reserved = ['to']

	constructor () {
		super({ content: null, to: '', media: null, sessionId: null })
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
			if (this.media instanceof File) this.media = await this.uploadFile('chats', this.media)

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
