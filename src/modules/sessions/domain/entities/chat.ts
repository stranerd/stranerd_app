import { BaseEntity, Media } from '@modules/core'

export class ChatEntity extends BaseEntity {
	readonly id: string
	readonly from: string
	readonly content: string | null
	readonly media: Media | null
	readonly path: [string, string]
	readonly sessionId: string | null
	readonly createdAt: number
	readonly updatedAt: number
	readonly readAt: number | null

	constructor ({ id, from, content, media, path, sessionId, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.content = content
		this.media = media
		this.path = path
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
		return this.isMedia && this.media?.type.startsWith('image/')
	}

	get to () {
		return this.path.find((id) => id !== this.from) ?? ''
	}
}

type ChatConstructorArgs = {
	id: string,
	from: string,
	path: [string, string],
	content: string | null,
	media: Media | null,
	createdAt: number
	updatedAt: number
	readAt: number | null
	sessionId: string | null
}
