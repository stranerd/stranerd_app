import { Media } from '@modules/core'

export enum PastQuestionType {
	objective = 'objective',
	theory = 'theory',
	practical = 'practical',
	german = 'german',
}

export type ObjType = {
	type: PastQuestionType.objective
	correctIndex: number
	options: string[]
	optionsMedia: Media[][]
	explanation: string
	explanationMedia: Media[]
}

export type TheoryType = {
	type: PastQuestionType.theory
	answer: string
	answerMedia: Media[]
}

export type PracticalType = {
	type: PastQuestionType.practical
	answer: string
	answerMedia: Media[]
}

export type GermanType = {
	type: PastQuestionType.german
	answer: string
	answerMedia: Media[]
}

export type PastQuestionData = ObjType | TheoryType | PracticalType | GermanType
