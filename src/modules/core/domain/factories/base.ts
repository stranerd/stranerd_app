import { Rule, Validator } from '@stranerd/validate'
import { reactive } from 'vue'
import { UploaderService } from '../../services/uploader'
import { UploadedFile } from '@modules/core'

export abstract class BaseFactory<E, T, K extends Record<string, any>> {
	errors: Record<keyof K, string>
	abstract toModel: () => Promise<T>
	abstract loadEntity: (entity: E) => void
	abstract reserved: string[]
	protected abstract readonly rules: Record<keyof K, { required: boolean | (() => boolean), nullable?: boolean, rules: Rule[] }>
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

		this.values[property] = value
		this.validValues[property] = check.isValid || ignoreRules ? value : this.defaults[property]
		this.errors[property] = this.defaults[property] === value ? '' : check.message

		return check.isValid
	}

	isValid = (property: keyof K) => this.checkValidity(property, this.validValues[property]).isValid

	validateAll () {
		Object.keys(this.defaults)
			.forEach((key) => this.set(key, this.values[key]))
	}

	checkValidity (property: keyof K, value: any) {
		const { isValid, errors } = Validator.single(value, this.rules[property].rules, {
			required: this.rules[property].required,
			nullable: this.rules[property].nullable
		})
		return { isValid, message: errors.find((e) => !!e) ?? '' }
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
