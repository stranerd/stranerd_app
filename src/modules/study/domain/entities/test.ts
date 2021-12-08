import { BaseEntity } from '@modules/core'
import { catchDivideByZero } from '@utils/commons'
import { PastQuestionType } from './pastQuestion'

export class TestEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly data: TestData
	public readonly questions: string[]
	public readonly questionType: PastQuestionType
	public readonly answers: Record<string, number | string>
	public readonly score: number
	public readonly userId: string
	public readonly prepId: string
	public readonly done: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             data,
		             questions,
		             questionType,
		             answers,
		             score,
		             userId,
		             prepId,
		             done,
		             createdAt,
		             updatedAt
	             }: TestConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.data = data
		this.questions = questions
		this.questionType = questionType
		this.answers = answers
		this.score = score
		this.userId = userId
		this.prepId = prepId
		this.done = done
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get progress () {
		const total = this.questions.length
		const done = Object.keys(this.answers).length
		return catchDivideByZero(done, total) * 100
	}
}

type TestConstructorArgs = {
	id: string
	name: string
	data: TestData
	questionType: PastQuestionType
	questions: string[]
	answers: Record<string, number | string>
	score: number
	userId: string
	prepId: string
	done: boolean
	createdAt: number
	updatedAt: number
}

export enum TestType {
	timed = 'timed',
	unTimed = 'unTimed'
}

type TimedType = {
	type: TestType.timed
	time: number
}

type UnTimedType = {
	type: TestType.unTimed
}

export type TestData = TimedType | UnTimedType
