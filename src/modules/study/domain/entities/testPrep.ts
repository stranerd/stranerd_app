import { BaseEntity } from '@modules/core'
import { PastQuestionType } from '@modules/school'

export class TestPrepEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly data: PrepData
	public readonly questions: number
	public readonly time: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, data, questions, time, createdAt, updatedAt }: TestPrepConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.data = data
		this.questions = questions
		this.time = time
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isPastQuestionType () {
		return this.data.type === PrepType.pastQuestion
	}

	get canTest () {
		return this.data.questionType === PastQuestionType.objective
	}

	get canStudy () {
		return true
	}

	get userId () {
		return 'admin'
	}

	get shareLink () {
		return `/study/preps/${this.data.institutionId}`
	}

	search (search: string) {
		return this.name.toLowerCase().includes(search.toLowerCase())
	}
}

type TestPrepConstructorArgs = {
	id: string
	name: string
	data: PrepData
	questions: number
	time: number
	createdAt: number
	updatedAt: number
}

export enum PrepType {
	pastQuestion = 'pastQuestion'
}

type PQType = {
	type: PrepType.pastQuestion
	questionType: PastQuestionType
	courseId: string
	year: number
	institutionId: string
}

export type PrepData = PQType
