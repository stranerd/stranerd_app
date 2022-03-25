import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, title, body, questionId, attachments,
			userId, best, createdAt, updatedAt,
			userBio, userRoles, votes
		} = model
		return new AnswerEntity({
			id, title, body, questionId, attachments,
			userId, best, createdAt, updatedAt,
			userBio, userRoles, votes
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
