import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { UserEntity } from '../entities/user'
import { UserSchoolData, UserSchoolType } from '../types'

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
	exams: Exam[]
}

export class UserSchoolFactory extends BaseFactory<UserEntity, UserSchoolData, Keys> {
	readonly rules = {
		body: v.string().min(3),
		type: v.any<UserSchoolType>().in(Object.values(UserSchoolType)),
		institutionId: v.string().min(1).requiredIf(() => this.isCollegeType),
		facultyId: v.string().min(1).requiredIf(() => this.isCollegeType),
		departmentId: v.string().min(1).requiredIf(() => this.isCollegeType),
		exams: v.array(v.any().addRule((val: any) =>
			v.object({
				institutionId: v.string().min(1),
				courseIds: v.array(v.string().min(1)).min(1),
				start: v.time().asStamp(),
				end: v.time().min(val?.start).asStamp(),
			}).parse(val)
		)).requiredIf(() => !this.isCollegeType)
	}
	reserved = ['type']
	insts = [] as string[]

	constructor () {
		super({
			type: UserSchoolType.college, institutionId: '', facultyId: '', departmentId: '', exams: []
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
