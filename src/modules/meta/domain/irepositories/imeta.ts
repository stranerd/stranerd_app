import { QueryResults } from '@modules/core'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { UserEntity } from '@modules/users'
import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'

export abstract class IMetaRepository {
	abstract search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionEntity>
		answers: QueryResults<AnswerEntity>
		users: QueryResults<UserEntity>
		videos: QueryResults<VideoEntity>
		notes: QueryResults<NoteEntity>
		testPreps: QueryResults<TestPrepEntity>
		sets: QueryResults<SetEntity>
		flashCards: QueryResults<FlashCardEntity>
	}>
}
