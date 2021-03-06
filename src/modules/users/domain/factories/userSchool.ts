import {
	arrayContainsX,
	hasMoreThan,
	isArrayOf,
	isArrayOfX,
	isLongerThanX,
	isMoreThanOrEqualTo,
	isNumber,
	isString
} from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { UserSchoolData, UserSchoolType } from '../types'
import { UserEntity } from '../entities/user'

type Exam = {
	institutionId: string
	courseIds: string[]
	startDate: number
	endDate: number
}

type Keys = {
	type: UserSchoolType
	institutionId: string
	facultyId: string
	departmentId: string
	tagId: string
	exams: Exam[]
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
		tagId: {
			required: () => this.isCollegeType,
			rules: [isString, isLongerThanX(0)]
		},
		exams: {
			required: () => !this.isCollegeType,
			rules: [isArrayOfX((value: Exam) => {
				const isInstitutionIdValid = isString(value.institutionId).valid
				const isCourseIdsValid = isArrayOf(value.courseIds, (cur) => isString(cur).valid, 'strings').valid &&
					hasMoreThan(value.courseIds, 0).valid
				const isStartValid = isNumber(value.startDate).valid
				const isEndValid = isNumber(value.endDate).valid && isMoreThanOrEqualTo(value.endDate, value.startDate).valid
				return [
					isInstitutionIdValid, isCourseIdsValid,
					isStartValid, isEndValid
				].every((v) => v)
			}, 'exams')]
		}
	}
	reserved = ['type']
	insts = [] as string[]

	constructor () {
		super({
			type: UserSchoolType.aspirant, institutionId: '', facultyId: '', departmentId: '', tagId: '', exams: []
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

	get departmentAndTag () {
		return [this.values.departmentId, this.values.tagId].join('---')
	}

	set departmentAndTag (value: string) {
		const [departmentId, tagId] = value.split('---')
		this.set('departmentId', departmentId)
		this.set('tagId', tagId)
	}

	get exams () {
		return this.values.exams
	}

	set exams (exams: Exam[]) {
		this.set('exams', exams, true)
	}

	get institutions () {
		return this.insts
	}

	set institutions (institutionIds: string[]) {
		const now = Date.now()
		this.exams = institutionIds.map((institutionId) => ({
			institutionId, courseIds: [], startDate: now, endDate: now,
			...(this.exams.find((e) => e.institutionId === institutionId) ?? {})
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

	getInstitution (institutionId: string) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const classThis = this
		const obj = this.exams.find((e) => e.institutionId === institutionId)!
		return {
			...obj,
			get courseIds () {
				return obj.courseIds
			},
			set courseIds (value: string[]) {
				obj.courseIds = value
				// eslint-disable-next-line no-self-assign
				classThis.exams = classThis.exams
			},
			get startTime () {
				return new Date(obj.startDate).toISOString().substring(0, 10)
			},
			set startTime (value: string) {
				obj.startDate = new Date(value).getTime()
				// eslint-disable-next-line no-self-assign
				classThis.exams = classThis.exams
			},
			get endTime () {
				return new Date(obj.endDate).toISOString().substring(0, 10)
			},
			set endTime (value: string) {
				obj.endDate = new Date(value).getTime()
				// eslint-disable-next-line no-self-assign
				classThis.exams = classThis.exams
			}
		}
	}

	loadEntity = (entity: UserEntity) => {
		if (!entity.school) return
		this.type = entity.school.type
		if (entity.school.type === UserSchoolType.college) {
			this.institutionId = entity.school.institutionId
			this.facultyId = entity.school.facultyId
			this.departmentAndTag = [entity.school.departmentId, entity.school.tagId].join('---')
		} else {
			this.set('exams', entity.school.exams)
			this.insts = entity.school.exams.map((e) => e.institutionId)
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { type, institutionId, facultyId, departmentId, tagId, exams } = this.validValues
			return (this.isCollegeType ? {
				type, institutionId, facultyId, departmentId, tagId
			} : { type, exams }) as UserSchoolData
		} else {
			throw new Error('Validation errors')
		}
	}
}
