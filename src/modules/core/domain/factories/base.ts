import { Rule, Validator } from '@stranerd/validate'
import { UploaderService } from '../../services/uploader'

export abstract class BaseFactory<E, T, K extends Record<string, any>> {
	errors: Record<keyof K, string>
	abstract toModel: () => Promise<T>
	abstract loadEntity: (entity: E) => void
	abstract reserved: string[]
	protected abstract readonly rules: Record<keyof K, { required: boolean, rules: Rule[] }>
	protected readonly defaults: K
	protected values: K
	protected validValues: K

	protected constructor (keys: K) {
		this.defaults = { ...keys }
		this.values = { ...keys }
		this.validValues = { ...keys }
		this.errors = Object.keys(keys)
			.reduce((acc, value: keyof K) => ({
				...acc, [value]: ''
			}), {} as Record<keyof K, string>)
	}

	get valid () {
		return Object.keys(this.defaults)
			.map((key) => this.isValid(key))
			.every((valid) => valid)
	}

	set (property: keyof K, value: any) {
		const check = this.checkValidity(property, value)

		this.values[property] = value
		this.validValues[property] = check.isValid ? value : this.defaults[property]
		this.errors[property] = check.message ?? ''

		return check.isValid
	}

	isValid = (property: keyof K) => this.checkValidity(property, this.validValues[property]).isValid

	validateAll () {
		Object.keys(this.defaults)
			.forEach((key) => this.set(key, this.values[key]))
	}

	checkValidity (property: keyof K, value: any) {
		const { isValid, errors } = Validator.single(value, this.rules[property].rules, this.rules[property].required)
		return { isValid, message: errors.find((e) => !!e) ?? null }
	}

	reset () {
		const reserved = ['userId', 'user']
		Object.keys(this.defaults)
			.filter((key) => !reserved.concat(this.reserved ?? []).includes(key))
			.forEach((key: keyof K) => {
				this.values[key] = this.defaults[key]
				this.validValues[key] = this.defaults[key]
				this.errors[key] = ''
			})
	}

	async uploadFile (path: string, file: File) {
		return await UploaderService.single(path, file)
	}

	async uploadFiles (path: string, files: File[]) {
		return await UploaderService.multiple(path, files)
	}
}
