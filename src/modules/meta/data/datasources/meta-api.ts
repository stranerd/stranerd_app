import { HttpClient, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import { UserFromModel } from '@modules/users/data/models/user'
import { MetaBaseDataSource } from './meta-base'
import { VideoFromModel } from '@modules/study/data/models/video'
import { NoteFromModel } from '@modules/study/data/models/note'
import { TestPrepFromModel } from '@modules/study/data/models/testPrep'
import { SetFromModel } from '@modules/study/data/models/set'
import { FlashCardFromModel } from '@modules/study/data/models/flashCard'

export class MetaApiDataSource implements MetaBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async search (search: string) {
		return this.stranerdClient.get<{}, {
			questions: QueryResults<QuestionFromModel>
			answers: QueryResults<AnswerFromModel>
			users: QueryResults<UserFromModel>
			videos: QueryResults<VideoFromModel>
			notes: QueryResults<NoteFromModel>
			testPreps: QueryResults<TestPrepFromModel>
			sets: QueryResults<SetFromModel>
			flashCards: QueryResults<FlashCardFromModel>
		}>('/meta/search', { search })
	}
}
