import { isFile, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { FileEntity } from '../entities/file'
import { FileToModel } from '../../data/models/file'

type Content = UploadedFile | Media

export class FileFactory extends BaseFactory<FileEntity, FileToModel, FileToModel & { media: Content }> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(2)] },
		media: { required: true, rules: [isFile] }
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
