import { QueryResults } from '@modules/core'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import { UserFromModel } from '@modules/users/data/models/user'

export interface MetaBaseDataSource {
	buyCoinsWithStripe: (data: { amount: number, currency: string, gold: number, bronze: number }) => Promise<{ id: string, clientSecret: string }>
	verifyStripePayment: (data: { intentId: string }) => Promise<boolean>
	search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionFromModel>
		answers: QueryResults<AnswerFromModel>
		users: QueryResults<UserFromModel>
	}>
}
