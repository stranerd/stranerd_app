import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractUrls, isImage, isVideo } from '@stranerd/validate'
import { EmbeddedUser } from '@modules/users'
import { ChatData, ChatType } from '../types'
import { formatNumber } from '@utils/commons'

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

	get isMedia () {
		return !!this.media
	}

	get isImage () {
		return this.isMedia && isImage(this.media).valid
	}

	get isVideo () {
		return this.isMedia && isVideo(this.media).valid
	}

	get isDocument () {
		return this.isMedia && (!this.isImage && !this.isVideo)
	}

	get size () {
		const size = this.media?.size ?? 0
		const ranges = [{ val: -1, key: 'b' }, { val: 1024, key: 'kb' },
			{ val: 1024 * 1024, key: 'mb' }, { val: 1024 * 1024 * 1024, key: 'gb' }]
		const range = ranges.find(({ val }) => size >= val)
		return `${formatNumber(size / (range?.val ?? -1))}${range?.key ?? 'b'}`
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
