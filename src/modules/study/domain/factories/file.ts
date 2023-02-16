import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { v } from 'valleyed'
import { FileToModel } from '../../data/models/file'
import { FileEntity } from '../entities/file'

type Content = UploadedFile | Media

export class FileFactory extends BaseFactory<FileEntity, FileToModel, FileToModel & { media: Content }> {
	readonly rules = {
		title: v.string().min(3),
		media: v.file()
	}

	reserved = []

	constructor () {
		super({ title: '', media: null as any })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get media () {
		return this.values.media
	}

	set media (value: Content) {
		const old = this.media
		this.set('media', value)
		if ([this.defaults.title, old?.name ?? ''].includes(this.title)) this.title = value.name
	}

	loadEntity = (entity: FileEntity) => {
		this.title = entity.title
		this.media = entity.media
	}

	toModel = async () => {
		if (this.valid) {
			const { title, media } = this.validValues
			return { title, media }
		} else {
			throw new Error('Validation errors')
		}
	}
}
