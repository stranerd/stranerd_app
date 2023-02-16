import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { GroupToModel } from '../../data/models/group'
import { GroupEntity } from '../entities/group'

export class GroupFactory extends BaseFactory<GroupEntity, GroupToModel, GroupToModel> {
	readonly rules = {
		name: v.string().min(3),
		classId: v.string().min(1)
	}

	reserved = ['classId']

	constructor () {
		super({ name: '', classId: '' })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value)
	}

	get classId () {
		return this.values.classId
	}

	set classId (value: string) {
		this.set('classId', value)
	}

	loadEntity = (entity: GroupEntity) => {
		this.name = entity.name
		this.classId = entity.classId
	}

	toModel = async () => {
		if (this.valid) {
			const { name, classId } = this.validValues
			return { name, classId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
