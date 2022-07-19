import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const {
			id, body, tagId, isAnswered,
			bestAnswers, createdAt, user, attachments,
			meta, answers, updatedAt
		} = model
		return new QuestionEntity({
			id, body, tagId, isAnswered,
			bestAnswers, createdAt, user, attachments,
			meta, answers, updatedAt
		})
	}

	toJSON (entity: QuestionEntity): QuestionToModel {
		return {
			body: entity.body,
			attachments: entity.attachments,
			tagId: entity.tagId
		}
	}
}
