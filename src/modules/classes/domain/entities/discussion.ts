import { BaseEntity, Media, parseMedia } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { extractUrls, isImage, isVideo } from '@stranerd/validate'
import { formatNumber } from '@utils/commons'

export class DiscussionEntity extends BaseEntity {
	public readonly id: string
	public readonly content: string
	public readonly media: Media | null
	public readonly links: { original: string, normalized: string }[]
	public readonly groupId: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             content,
		             media,
		             links,
		             groupId,
		             classId,
		             user,
		             createdAt,
		             updatedAt
	             }: DiscussionConstructorArgs) {
		super()
		this.id = id
		this.content = content
		this.media = media ? parseMedia(media) : null
		this.links = links
		this.groupId = groupId
		this.classId = classId
		this.user = generateEmbeddedUser(user)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
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

	get formattedContent () {
		let content = this.content
		extractUrls(content).forEach(({ original, normalized }) => {
			content = content.replaceAll(original, `<a href="${normalized}" target="_blank" style="text-decoration: underline; color: #027eb5;">${original}</a>`)
		})
		return content
	}

	search (search: string) {
		return (this.media?.name ?? '').toLowerCase().includes(search.toLowerCase())
	}
}

type DiscussionConstructorArgs = {
	id: string
	content: string
	media: Media | null
	links: { original: string, normalized: string }[]
	createdAt: number
	updatedAt: number
	groupId: string
	classId: string
	user: EmbeddedUser
}
