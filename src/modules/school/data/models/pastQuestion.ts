import { Media } from '@modules/core'
import { PastQuestionData } from '../../domain/types'

export interface PastQuestionFromModel extends PastQuestionToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface PastQuestionToModel {
	institutionId: string
	courseId: string
	year: number
	question: string
	questionMedia: Media[]
	data: PastQuestionData
}
