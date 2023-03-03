import { UploadedFile } from '@modules/core'
import { deepUnref } from '@utils/unref'
import { Differ, VCore } from 'valleyed'
import { reactive } from 'vue'
import { UploaderService } from '../../services/uploader'

export abstract class BaseFactory<E, T, K extends Record<string, any>> {
	errors: Record<keyof K, string>
	abstract toModel: () => Promise<T>
	abstract loadEntity: (entity: E) => void
	abstract reserved: string[]
	protected abstract readonly rules: { [Key in keyof K]: VCore<any, K[Key] | undefined | null> }
	protected readonly defaults: K
	protected values: K
	protected validValues: K

	protected constructor (keys: K) {
		this.defaults = reactive({ ...keys })
		this.values = reactive({ ...keys })
		this.validValues = reactive({ ...keys })
		this.errors = Object.keys(keys)
			.reduce((acc, value: keyof K) => {
				acc[value] = ''
				return acc
			}, reactive({}) as Record<keyof K, string>)
	}

	get valid () {
		return Object.keys(this.defaults)
			.map((key) => this.isValid(key))
			.every((valid) => valid)
	}

	set (property: keyof K, value: any, ignoreRules = false) {
		const check = this.checkValidity(property, value)

		this.values[property] = check.value as any
		this.validValues[property] = check.valid || ignoreRules ? check.value as any : this.defaults[property]
		this.errors[property] = Differ.equal(this.defaults[property], value) ? '' : check.errors.at(0) ?? ''

		return check.valid
	}

	isValid = (property: keyof K) => this.checkValidity(property, this.validValues[property]).valid

	validateAll () {
		Object.keys(this.defaults)
			.forEach((key) => this.set(key, this.values[key]))
	}

	checkValidity (property: keyof K, value: any) {
		return this.rules[property].parse(deepUnref(value))
	}

	reset () {
		const reserved = (this.reserved ?? []).concat(['userId', 'user', 'userBio'])
		Object.keys(this.defaults)
			.filter((key) => !reserved.includes(key))
			.forEach((key) => this.resetProp(key))
	}

	async uploadFile (path: string, file: UploadedFile) {
		return await UploaderService.single(path, file)
	}

	async uploadFiles (path: string, files: UploadedFile[]) {
		return await UploaderService.multiple(path, files)
	}

	resetProp (property: keyof K) {
		this.values[property] = this.defaults[property]
		this.validValues[property] = this.defaults[property]
		this.errors[property] = ''
	}
}
