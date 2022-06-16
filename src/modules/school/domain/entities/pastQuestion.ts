import { BaseEntity, Media, parseMedia } from '@modules/core'
import { PastQuestionData, PastQuestionType } from '../types'

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
		if (data.data.type === PastQuestionType.objective) {
			data.data.optionsMedia = data.data.optionsMedia.map((medias) => medias.map(parseMedia))
			data.data.explanationMedia = data.data.explanationMedia.map(parseMedia)
		} else data.data.answerMedia = data.data.answerMedia.map(parseMedia)
		this.data = data.data
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
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
