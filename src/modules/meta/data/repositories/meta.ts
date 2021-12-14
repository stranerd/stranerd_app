import { QuestionTransformer } from '@modules/questions/data/transformers/question'
import { AnswerTransformer } from '@modules/questions/data/transformers/answer'
import { UserTransformer } from '@modules/users/data/transformers/user'
import { IMetaRepository } from '../../domain/irepositories/imeta'
import { MetaBaseDataSource } from '../datasources/meta-base'
import { VideoTransformer } from '@modules/study/data/transformers/video'
import { NoteTransformer } from '@modules/study/data/transformers/note'
import { SetTransformer } from '@modules/study/data/transformers/set'
import { FlashCardTransformer } from '@modules/study/data/transformers/flashCard'
import { TestPrepTransformer } from '@modules/study/data/transformers/testPrep'

export class MetaRepository implements IMetaRepository {
	private readonly dataSource: MetaBaseDataSource

	constructor (dataSource: MetaBaseDataSource) {
		this.dataSource = dataSource
	}

	async search (search: string) {
		const questionTransformer = new QuestionTransformer()
		const answerTransformer = new AnswerTransformer()
		const userTransformer = new UserTransformer()
		const videoTransformer = new VideoTransformer()
		const noteTransformer = new NoteTransformer()
		const setTransformer = new SetTransformer()
		const flashCardTransformer = new FlashCardTransformer()
		const testPrepTransformer = new TestPrepTransformer()
		const models = await this.dataSource.search(search)
		return {
			questions: {
				...models.questions,
				results: models.questions.results.map(questionTransformer.fromJSON)
			},
			answers: {
				...models.answers,
				results: models.answers.results.map(answerTransformer.fromJSON)
			},
			users: {
				...models.users,
				results: models.users.results.map(userTransformer.fromJSON)
			},
			videos: {
				...models.videos,
				results: models.videos.results.map(videoTransformer.fromJSON)
			},
			notes: {
				...models.notes,
				results: models.notes.results.map(noteTransformer.fromJSON)
			},
			sets: {
				...models.sets,
				results: models.sets.results.map(setTransformer.fromJSON)
			},
			flashCards: {
				...models.flashCards,
				results: models.flashCards.results.map(flashCardTransformer.fromJSON)
			},
			testPreps: {
				...models.testPreps,
				results: models.testPreps.results.map(testPrepTransformer.fromJSON)
			}
		}
	}
}
