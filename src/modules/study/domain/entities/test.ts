import { BaseEntity } from '@modules/core'
import { divideByZero } from 'valleyed'
import { PastQuestionType } from '@modules/school'

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

	get isOBJ () {
		return this.questionType === PastQuestionType.objective
	}

	get progress () {
		if (!this.isOBJ) return 1
		return divideByZero(this.answered + 1, this.questions.length)
	}

	get isTimed () {
		return this.data.type === TestType.timed
	}

	get endedAt () {
		// @ts-ignore
		return this.createdAt + (this.data.time ?? 0) * 60 * 1000
	}

	get answered () {
		return Object.values(this.answers).length
	}

	get correctAnswers () {
		return Math.round(this.questions.length * this.score / 100)
	}

	get scoreText () {
		return this.score > 90 ? 'Splendid' : this.score > 70 ? 'Nice try' : this.score > 50 ? 'Close call' : 'Keep trying'
	}

	get passed () {
		return this.score > 50
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
