import { BaseEntity, Media } from '@modules/core'

export class PastQuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly year: number
	public readonly institutionId: string
	public readonly courseId: string
	public readonly question: string
	public readonly questionMedia: Media[]
	public readonly data: PastQuestionData
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor (data: PastQuestionConstructorArgs) {
		super()
		this.id = data.id
		this.year = data.year
		this.institutionId = data.institutionId
		this.courseId = data.courseId
		this.question = data.question
		this.questionMedia = data.questionMedia
		this.data = data.data
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}

	get isObjective () {
		return this.data.type === PastQuestionType.objective
	}
}

type PastQuestionConstructorArgs = {
	id: string,
	institutionId: string
	courseId: string
	year: number
	question: string
	questionMedia: Media[]
	data: PastQuestionData
	createdAt: number
	updatedAt: number
}

export enum PastQuestionType {
	objective = 'objective',
	theory = 'theory',
	practical = 'practical'
}

export type PastQuestionData = {
	type: PastQuestionType.objective
	correctIndex: number
	options: string[]
	optionsMedia: Media[][]
	explanation: string
	explanationMedia: Media[]
} | {
	type: PastQuestionType.theory
	answer: string
	answerMedia: Media[]
} | {
	type: PastQuestionType.practical
	answer: string
	answerMedia: Media[]
}
