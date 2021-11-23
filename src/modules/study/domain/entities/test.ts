import { BaseEntity } from '@modules/core'

export class TestEntity extends BaseEntity {
	public readonly id: string
	public readonly data: TestData
	public readonly questions: string[]
	public readonly answers: Record<string, number>
	public readonly score: number
	public readonly userId: string
	public readonly prepId: string
	public readonly done: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             data,
		             questions,
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
		this.data = data
		this.questions = questions
		this.answers = answers
		this.score = score
		this.userId = userId
		this.prepId = prepId
		this.done = done
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TestConstructorArgs = {
	id: string
	data: TestData
	questions: string[]
	answers: Record<string, number>
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
	type: TestType.timed
	time: number
}

export type TestData = TimedType | UnTimedType