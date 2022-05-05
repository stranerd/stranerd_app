import { BaseEntity, Media, parseMedia } from '@modules/core'
import { isImage } from '@stranerd/validate'

export class ChatEntity extends BaseEntity {
	readonly id: string
	readonly from: string
	readonly to: string
	readonly content: string
	readonly media: Media | null
	readonly sessionId: string | null
	readonly createdAt: number
	readonly updatedAt: number
	readonly readAt: number | null

	constructor ({ id, from, to, content, media, sessionId, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.to = to
		this.content = content
		this.media = media ? parseMedia(media) : null
		this.sessionId = sessionId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}

	get isMedia () {
		return !!this.media
	}

	get isRead () {
		return !!this.readAt
	}

	get isImage () {
		return this.isMedia && isImage(this.media).valid
	}
}

type ChatConstructorArgs = {
	id: string,
	from: string,
	to: string,
	content: string,
	media: Media | null,
	createdAt: number
	updatedAt: number
	readAt: number | null
	sessionId: string | null
}
