import { QueryResults } from '@modules/core'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import { UserFromModel } from '@modules/users/data/models/user'
import { VideoFromModel } from '@modules/study/data/models/video'
import { NoteFromModel } from '@modules/study/data/models/note'
import { TestPrepFromModel } from '@modules/study/data/models/testPrep'
import { SetFromModel } from '@modules/study/data/models/set'
import { FlashCardFromModel } from '@modules/study/data/models/flashCard'

export interface MetaBaseDataSource {
	search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionFromModel>
		answers: QueryResults<AnswerFromModel>
		users: QueryResults<UserFromModel>
		videos: QueryResults<VideoFromModel>
		notes: QueryResults<NoteFromModel>
		testPreps: QueryResults<TestPrepFromModel>
		sets: QueryResults<SetFromModel>
		flashCards: QueryResults<FlashCardFromModel>
	}>
}
