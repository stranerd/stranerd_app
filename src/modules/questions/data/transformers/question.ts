import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionEntity } from '../../domain/entities/question'

export class QuestionTransformer {
	fromJSON (model: QuestionFromModel) {
		const {
			id, body, subject, isAnswered, data,
			bestAnswers, createdAt, user, attachments,
			answers, updatedAt
		} = model
		return new QuestionEntity({
			id, body, subject, isAnswered, data,
			bestAnswers, createdAt, user, attachments,
			answers, updatedAt
		})
	}

	toJSON (entity: QuestionEntity): QuestionToModel {
		return {
			body: entity.body,
			data: entity.data,
			attachments: entity.attachments,
			subject: entity.subject
		}
	}
}
