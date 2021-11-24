import { BaseFactory } from '@modules/core'
import { isLongerThanX, isString } from '@stranerd/validate'
import { PastQuestionEntity } from '../entities/pastQuestion'
import { PastQuestionToModel } from '../../data/models/pastQuestion'

type Keys = {
	institutionId: string
}

export class PastQuestionFactory extends BaseFactory<PastQuestionEntity, PastQuestionToModel, Keys> {
	readonly rules = {
		institutionId: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ institutionId: '' })
	}

	get institutionId () {
		return this.values.institutionId
	}

	set institutionId (value: string) {
		this.set('institutionId', value)
	}

	loadEntity = (entity: PastQuestionEntity) => {
		this.institutionId = entity.institutionId
	}

	toModel = async () => {
		if (this.valid) {
			const { institutionId } = this.validValues
			return { institutionId } as any
		} else {
			throw new Error('Validation errors')
		}
	}
}
