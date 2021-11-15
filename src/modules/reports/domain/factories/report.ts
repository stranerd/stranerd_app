import { BaseFactory } from '@modules/core'
import { arrayContainsX, isLongerThanX, isString } from '@stranerd/validate'
import { ReportToModel } from '../../data/models/report'
import { ReportEntity, ReportType } from '../entities/report'

type Keys = {
	reportedId: string, type: ReportType, message: string
}

export class ReportFactory extends BaseFactory<ReportEntity<any>, ReportToModel, Keys> {
	public rules = {
		type: {
			required: true,
			rules: [isString, arrayContainsX(Object.values<string>(ReportType), (cur, val) => cur === val)]
		},
		reportedId: { required: true, rules: [isString, isLongerThanX(0)] },
		message: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ reportedId: '', type: ReportType.users, message: '' })
	}

	get message () {
		return this.values.message
	}

	set message (value: string) {
		this.set('message', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: ReportType) {
		this.set('type', value)
	}

	get reportedId () {
		return this.values.reportedId
	}

	set reportedId (value: string) {
		this.set('reportedId', value)
	}

	public toModel = async () => {
		if (this.valid) {
			const { type, reportedId, message } = this.validValues
			return { type, reportedId, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ReportEntity<any>) => {
		this.reportedId = entity.reportedId
		this.type = entity.type
		this.message = entity.message
	}
}
