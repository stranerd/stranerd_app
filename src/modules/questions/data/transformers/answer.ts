import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, title, body, coins, questionId, tags, attachments,
			userId, best, commentsCount, createdAt, updatedAt,
			userBio, votes
		} = model
		return new AnswerEntity({
			id, title, body, coins, questionId, tags, attachments,
			userId, best, commentsCount, createdAt, updatedAt,
			userBio, votes
		})
	}

	toJSON (entity: AnswerEntity): AnswerToModel {
		return {
			title: entity.title,
			body: entity.body,
			attachments: entity.attachments,
			questionId: entity.questionId
		}
	}
}
