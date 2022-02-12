export interface Media {
	name: string
	type: string
	size: number
	path: string
	timestamp: number
	link: string
	toUpload: false
}

export class UploadedFile {
	readonly name: string
	readonly type: string
	readonly size: number
	readonly data: Blob
	readonly ref: File

	constructor ({ name, type, size, data, ref }: { name: string, type: string, size: number, data: Blob, ref: File }) {
		this.name = name
		this.type = type
		this.size = size
		this.data = data
		this.ref = ref
	}
}
