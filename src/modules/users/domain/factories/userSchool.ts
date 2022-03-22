import { arrayContainsX, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { UserSchoolData, UserSchoolType } from '../types'
import { UserEntity } from '../entities/user'

type Keys = {
	type: UserSchoolType
	institutionId: string
	facultyId: string
	departmentId: string
	exams: {
		institutionId: string
		courseIds: string[]
		startDate: number
		endDate: number
	}[]
}

export class UserSchoolFactory extends BaseFactory<UserEntity, UserSchoolData, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isLongerThanX(2)] },
		type: { required: true, rules: [arrayContainsX(Object.values(UserSchoolType), (cur, val) => cur === val)] },
		institutionId: {
			required: () => this.isCollegeType,
			rules: [isString, isLongerThanX(0)]
		},
		facultyId: {
			required: () => this.isCollegeType,
			rules: [isString, isLongerThanX(0)]
		},
		departmentId: {
			required: () => this.isCollegeType,
			rules: [isString, isLongerThanX(0)]
		},
		exams: {
			required: () => this.isCollegeType,
			rules: []
		}
	}
	reserved = ['type']
	insts = [] as string[]

	constructor () {
		super({
			type: UserSchoolType.aspirant, institutionId: '', facultyId: '', departmentId: '', exams: []
		})
	}

	get type () {
		return this.values.type
	}

	set type (value: UserSchoolType) {
		this.set('type', value)
	}

	get institutionId () {
		return this.values.institutionId
	}

	set institutionId (value: string) {
		this.set('institutionId', value)
		this.resetProp('facultyId')
		this.resetProp('departmentId')
	}

	get facultyId () {
		return this.values.facultyId
	}

	set facultyId (value: string) {
		this.set('facultyId', value)
		this.resetProp('departmentId')
	}

	get departmentId () {
		return this.values.departmentId
	}

	set departmentId (value: string) {
		this.set('departmentId', value)
	}

	get exams () {
		return this.values.exams
	}

	set exams (exams: { institutionId: string, courseIds: string[], startDate: number, endDate: number }[]) {
		this.set('exams', exams)
	}

	get institutions () {
		return this.insts
	}

	set institutions (institutionIds: string[]) {
		const now = Date.now()
		this.set('exams', institutionIds.map((institutionId) => {
			return { institutionId, courseIds: [], startDate: now, endDate: now }
		}))
		this.insts.length = 0
		this.insts.push(...this.exams.map((e) => e.institutionId))
	}

	get isCollegeType () {
		return this.type === UserSchoolType.college
	}

	get isAspirantType () {
		return this.type === UserSchoolType.aspirant
	}

	get isSecondaryType () {
		return this.type === UserSchoolType.secondary
	}

	loadEntity = (entity: UserEntity) => {
		if (!entity.school) return
		this.type = entity.school.type
		if (entity.school.type === UserSchoolType.college) {
			this.institutionId = entity.school.institutionId
			this.facultyId = entity.school.facultyId
			this.departmentId = entity.school.departmentId
		} else {
			this.set('exams', entity.school.exams)
			this.insts = entity.school.exams.map((e) => e.institutionId)
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { type, institutionId, facultyId, departmentId, exams } = this.validValues
			return (this.isCollegeType ? {
				type, institutionId, facultyId, departmentId
			} : { type, exams }) as UserSchoolData
		} else {
			throw new Error('Validation errors')
		}
	}
}
