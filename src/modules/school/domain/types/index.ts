import { Media } from '@modules/core'
import { PastQuestionEntity } from '../entities/pastQuestion'

export enum PastQuestionType {
	objective = 'objective',
	theory = 'theory',
	practical = 'practical',
	german = 'german',
}

type ObjType = {
	type: PastQuestionType.objective
	correctIndex: number
	options: string[]
	optionsMedia: Media[][]
	explanation: string
	explanationMedia: Media[]
}

type TheoryType = {
	type: PastQuestionType.theory
	answer: string
	answerMedia: Media[]
}

type PracticalType = {
	type: PastQuestionType.practical
	answer: string
	answerMedia: Media[]
}

type GermanType = {
	type: PastQuestionType.german
	answer: string
	answerMedia: Media[]
}

export type PastQuestionData = ObjType | TheoryType | PracticalType | GermanType

export const isPastQuestionObj = (question: PastQuestionEntity): question is Omit<PastQuestionEntity, 'data'> & { data: ObjType } => question.data.type === PastQuestionType.objective
export const isPastQuestionNotObj = (question: PastQuestionEntity): question is Omit<PastQuestionEntity, 'data'> & { data: TheoryType } => question.data.type !== PastQuestionType.objective
