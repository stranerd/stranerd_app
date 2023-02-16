import { BaseFactory } from '@modules/core'
import { PastQuestionType } from '@modules/school'
import { v } from 'valleyed'
import { TestPrepToModel } from '../../data/models/testPrep'
import { PrepType, TestPrepEntity } from '../entities/testPrep'

type Keys = {
	name: string
	questions: number
	time: number
	type: PrepType
	questionType: PastQuestionType
	courseId: string
	year: number
	institutionId: string
}

export class TestPrepFactory extends BaseFactory<TestPrepEntity, TestPrepToModel, Keys> {
	readonly rules = {
		name: v.string().min(1),
		questions: v.number().gt(0),
		time: v.number().gt(0),
		type: v.any<PrepType>().in(Object.values(PrepType)),
		questionType: v.any<PastQuestionType>().in(Object.values(PastQuestionType)),
		courseId: v.string().min(1).requiredIf(() => this.isPastQuestion),
		institutionId: v.string().min(1).requiredIf(() => this.isPastQuestion),
		year: v.number().gt(0).requiredIf(() => this.isPastQuestion),
	}

	reserved = []

	constructor () {
		super({
			name: '', questions: 0, time: 0, type: PrepType.pastQuestion,
			questionType: PastQuestionType.objective, institutionId: '', courseId: '', year: 0
		})
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value)
	}

	get questions () {
		return this.values.questions
	}

	set questions (value: number) {
		this.set('questions', value)
	}

	get time () {
		return this.values.time
	}

	set time (value: number) {
		this.set('time', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: string) {
		this.set('type', value)
	}

	get questionType () {
		return this.values.questionType
	}

	set questionType (value: string) {
		this.set('questionType', value)
	}

	get isPastQuestion () {
		return this.type === PrepType.pastQuestion
	}

	get institutionId () {
		return this.values.institutionId
	}

	set institutionId (value: string) {
		this.set('institutionId', value)
	}

	get courseId () {
		return this.values.courseId
	}

	set courseId (value: string) {
		this.set('courseId', value)
	}

	get year () {
		return this.values.year
	}

	set year (value: number) {
		this.set('year', value)
	}

	get questionTypes () {
		return Object.keys(PastQuestionType)
	}

	loadEntity = (entity: TestPrepEntity) => {
		this.name = entity.name
		this.questions = entity.questions
		this.time = entity.time
		this.type = entity.data.type
		if (entity.data.type === PrepType.pastQuestion) {
			this.questionType = entity.data.questionType
			this.institutionId = entity.data.institutionId
			this.courseId = entity.data.courseId
			this.year = entity.data.year
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { name, questions, time, type, questionType, courseId, year, institutionId } = this.validValues
			return {
				name, questions, time,
				data: this.isPastQuestion ? { type, questionType, courseId, year, institutionId } : ({} as any)
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
