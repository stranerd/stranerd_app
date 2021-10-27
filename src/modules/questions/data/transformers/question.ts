import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const {
			id, body, coins, subjectId, creditable, isAnswered,
			bestAnswers, createdAt, userId, userBio, attachments,
			answers, commentsCount, tags, updatedAt
		} = model
		return new QuestionEntity({
			id, body, coins, subjectId, creditable, isAnswered,
			bestAnswers, createdAt, userId, userBio, attachments,
			answers, commentsCount, tags, updatedAt
		})
	}

	toJSON (entity: QuestionEntity): QuestionToModel {
		return {
			body: entity.body,
			coins: entity.coins,
			tags: entity.tags,
			attachments: entity.attachments,
			subjectId: entity.subjectId
		}
	}
}
