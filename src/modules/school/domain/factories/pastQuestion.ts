import { BaseFactory, Media, UploadedFile } from '@modules/core'
import {
	arrayContainsX,
	hasMoreThanX,
	isArrayOf,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLongerThanX,
	isMoreThanX,
	isNumber,
	isString
} from '@stranerd/validate'
import { PastQuestionEntity, PastQuestionType } from '../entities/pastQuestion'
import { PastQuestionToModel } from '../../data/models/pastQuestion'

type Content = UploadedFile | Media
type Keys = {
	institutionId: string,
	courseId: string
	year: number
	type: PastQuestionType
	question: string
	questionMedia: Content[]
	answer: string
	answerMedia: Content[]
	options: string[]
	optionsMedia: Content[][]
	correctIndex: number
	explanation: string
	explanationMedia: Content[]
}

export class PastQuestionFactory extends BaseFactory<PastQuestionEntity, PastQuestionToModel, Keys> {
	readonly rules = {
		institutionId: { required: true, rules: [isString, isLongerThanX(0)] },
		courseId: { required: true, rules: [isString, isLongerThanX(0)] },
		year: { required: true, rules: [isNumber, isMoreThanX(0)] },
		type: {
			required: true,
			rules: [arrayContainsX(Object.keys(PastQuestionType), (cur, val) => cur === val)]
		},
		question: { required: true, rules: [isString, isExtractedHTMLLongerThanX(0)] },
		questionMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		answer: {
			required: () => !this.isObjective, nullable: true,
			rules: [isString]
		},
		answerMedia: {
			required: () => !this.isObjective, nullable: true,
			rules: [isArrayOfX((com) => isImage(com).valid, 'images')]
		},
		options: {
			required: () => this.isObjective, nullable: true,
			rules: [isArrayOfX((cur: any) => isString(cur).valid, 'questions'), hasMoreThanX(0)]
		},
		optionsMedia: {
			required: () => this.isObjective, nullable: true,
			rules: [
				isArrayOfX((cur: any) => isArrayOf(cur, (com) => isImage(com).valid, 'images').valid, 'images')
			]
		},
		correctIndex: {
			required: () => this.isObjective, nullable: true,
			rules: [isNumber]
		},
		explanation: {
			required: () => this.isObjective, nullable: true,
			rules: [isString]
		},
		explanationMedia: {
			required: () => this.isObjective, nullable: true,
			rules: [isArrayOfX((com) => isImage(com).valid, 'images')]
		}
	}

	reserved = []

	constructor () {
		super({
			institutionId: '',
			courseId: '',
			type: PastQuestionType.objective,
			year: 0,
			question: '',
			questionMedia: [],
			answer: '',
			answerMedia: [],
			options: [''],
			optionsMedia: [[]],
			correctIndex: 0,
			explanation: '',
			explanationMedia: []
		})
	}

	get institutionId () {
		return this.values.institutionId
	}

	set institutionId (value: string) {
		this.set('institutionId', value)
	}

	get courseId () {
		return this.values.courseId
	}

	set courseId (value: string) {
		this.set('courseId', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: PastQuestionType) {
		this.set('type', value)
	}

	get year () {
		return this.values.year
	}

	set year (value: number) {
		this.set('year', value)
	}

	get question () {
		return this.values.question
	}

	set question (value: string) {
		this.set('question', value)
	}

	get correctIndex () {
		return this.values.correctIndex
	}

	set correctIndex (value: number) {
		this.set('correctIndex', value)
	}

	get answer () {
		return this.values.answer
	}

	set answer (value: string) {
		this.set('answer', value)
	}

	get explanation () {
		return this.values.explanation
	}

	set explanation (value: string) {
		this.set('explanation', value)
	}

	get questionMedia () {
		return this.values.questionMedia
	}

	get answerMedia () {
		return this.values.answerMedia
	}

	get explanationMedia () {
		return this.values.explanationMedia
	}

	get optionsMedia () {
		return this.values.optionsMedia
	}

	get options () {
		return this.values.options
	}

	get isObjective () {
		return this.type === PastQuestionType.objective
	}

	get questionTypes () {
		return Object.keys(PastQuestionType)
	}

	addOption = () => {
		this.set('options', [...this.options, ''])
		this.set('optionsMedia', [...this.optionsMedia, []])
	}

	removeOption = (index: number) => {
		this.set('options', this.options.filter((_, idx) => idx !== index))
		this.set('optionsMedia', this.optionsMedia.filter((_, idx) => idx !== index))
		if (this.correctIndex === index) this.set('correctIndex', 0)
	}

	addQuestionMedia = (value: Content) => this.set('questionMedia', [...this.values.questionMedia, value])
	removeQuestionMedia = (value: Content) => this.set('questionMedia', this.values.questionMedia.filter((doc) => doc.name !== value.name))

	addAnswerMedia = (value: Content) => this.set('answerMedia', [...this.values.answerMedia, value])
	removeAnswerMedia = (value: Content) => this.set('answerMedia', this.values.answerMedia.filter((doc) => doc.name !== value.name))

	addExplanationMedia = (value: Content) => this.set('explanationMedia', [...this.values.explanationMedia, value])
	removeExplanationMedia = (value: Content) => this.set('explanationMedia', this.values.explanationMedia.filter((doc) => doc.name !== value.name))

	addOptionsMedia = (index: number, value: Content) => {
		const existing = [...this.values.optionsMedia]
		existing[index] = [...existing[index], value]
		this.set('optionsMedia', existing)
	}
	removeOptionsMedia = (index: number, value: Content) => {
		const existing = [...this.values.optionsMedia]
		existing[index] = existing[index].filter((doc) => doc.name !== value.name)
		this.set('optionsMedia', existing)
	}

	loadEntity = (entity: PastQuestionEntity) => {
		this.institutionId = entity.institutionId
		this.courseId = entity.courseId
		this.year = entity.year
		this.question = entity.question
		this.set('questionMedia', entity.questionMedia)
		this.type = entity.data.type
		if (entity.data.type === PastQuestionType.objective) {
			this.set('options', entity.data.options ?? [])
			this.set('optionsMedia', entity.data.optionsMedia ?? [])
			this.correctIndex = entity.data.correctIndex
			this.explanation = entity.data.explanation ?? ''
			this.set('explanationMedia', entity.data.explanationMedia ?? [])
		} else {
			this.answer = entity.data.answer
			this.set('answerMedia', entity.data.answerMedia ?? [])
		}
	}

	toModel = async () => {
		if (this.valid) {
			this.set('questionMedia', await Promise.all(this.questionMedia.map(async (doc) => {
				if (doc instanceof UploadedFile) return await this.uploadFile(`study/pastQuestions/${this.type}/questions`, doc)
				return doc
			})))

			if (this.isObjective) {
				this.set('optionsMedia', await Promise.all(
					this.optionsMedia.map(async (option) => {
						option.map(async (doc) => {
							if (doc instanceof UploadedFile) return await this.uploadFile(`study/pastQuestions/${this.type}/options`, doc)
							return doc
						})
					})
				))
				this.set('explanationMedia', await Promise.all(this.explanationMedia.map(async (doc) => {
					if (doc instanceof UploadedFile) return await this.uploadFile(`study/pastQuestions/${this.type}/explanations`, doc)
					return doc
				})))
			} else {
				this.set('answerMedia', await Promise.all(this.answerMedia.map(async (doc) => {
					if (doc instanceof UploadedFile) return await this.uploadFile(`study/pastQuestions/${this.type}/answers`, doc)
					return doc
				})))
			}

			const {
				institutionId, courseId, year, type, question, questionMedia,
				answer, answerMedia, options, optionsMedia, correctIndex, explanation, explanationMedia
			} = this.validValues
			return {
				institutionId, courseId, year, question, questionMedia: questionMedia as Media[],
				data: this.isObjective ? {
					type: type as any,
					options,
					optionsMedia: optionsMedia as Media[][],
					correctIndex,
					explanation,
					explanationMedia: explanationMedia as Media[]
				} : { type: type as any, answer, answerMedia: answerMedia as Media[] }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
