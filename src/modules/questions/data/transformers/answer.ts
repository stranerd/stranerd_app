import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, body, questionId, tagId, attachments,
			user, best, createdAt, updatedAt, votes, comments
		} = model
		return new AnswerEntity({
			id, body, questionId, tagId, attachments,
			user, best, createdAt, updatedAt, votes, comments
		})
	}

	toJSON (entity: AnswerEntity): AnswerToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			questionId: entity.questionId
		}
	}
}
