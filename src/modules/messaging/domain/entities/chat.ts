import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractUrls, isImage, isVideo } from 'valleyed'
import { EmbeddedUser } from '@modules/users'
import { ChatClasses, ChatData, ChatPersonal, ChatType } from '../types'

export class ChatEntity extends BaseEntity {
	readonly id: string
	readonly to: string
	readonly media: Media | null
	readonly body: string
	readonly from: EmbeddedUser
	readonly data: ChatData
	readonly links: { original: string, normalized: string }[]
	readonly readAt: Record<string, number>
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({ id, from, to, body, links, media, data, createdAt, updatedAt, readAt }: ChatConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.to = to
		this.body = body
		this.links = links
		this.media = media ? parseMedia(media) : null
		this.data = data
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}

	get saveFilePath () {
		if (this.data.type === ChatType.personal) return `messaging/${ChatType.personal}/${this.to}/files`
		return `messaging/${ChatType.classes}/${this.data.classId}/${this.to}/files`
	}

	get isMedia () {
		return !!this.media
	}

	get isImage () {
		return this.isMedia && isImage()(this.media).valid
	}

	get isVideo () {
		return this.isMedia && isVideo()(this.media).valid
	}

	get isDoc () {
		return this.isMedia && (!this.isImage && !this.isVideo)
	}

	get formattedBody () {
		let body = this.body
		extractUrls(body).forEach(({ original, normalized }) => {
			body = body.replaceAll(original, `<a href="${normalized}" target="_blank" style="text-decoration: underline; color: #027eb5;">${original}</a>`)
		})
		return body
	}

	static getLink (to: string, data: ChatData) {
		if (data.type === ChatType.personal) return `/messages/personal/${to}`
		if (data.type === ChatType.classes) return `/messages/classes/${data.classId}/${to}`
		return ''
	}

	search (search: string) {
		const val = [
			this.body.toLowerCase().includes(search.toLowerCase()),
			(this.media?.name ?? '').toLowerCase().includes(search.toLowerCase())
		]
		return val.some((v) => v)
	}

	isRead (userId: string) {
		return !!this.readAt[userId]
	}

	isPersonal (chat: ChatEntity): chat is Omit<ChatEntity, 'data'> & { data: ChatPersonal } {
		return chat.data.type === ChatType.personal
	}

	isClasses (chat: ChatEntity): chat is Omit<ChatEntity, 'data'> & { data: ChatClasses } {
		return chat.data.type === ChatType.classes
	}
}

type ChatConstructorArgs = {
	id: string
	to: string
	media: Media | null
	body: string
	from: EmbeddedUser
	data: ChatData
	links: { original: string, normalized: string }[]
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}
