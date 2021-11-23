import { BaseEntity } from '@modules/core'

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

type PastQuestionType = {
	type: PrepType.pastQuestion
	courseId: string
	year: number
	institutionId: string
}

export type PrepData = PastQuestionType