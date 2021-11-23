import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestion'
import { PastQuestionEntity } from '../../domain/entities/pastQuestion'

export class PastQuestionTransformer {
	fromJSON (model: PastQuestionFromModel) {
		const { id, question, questionMedia, courseId, data, year, institutionId, createdAt, updatedAt } = model
		return new PastQuestionEntity({
			id, question, questionMedia, courseId, data, year, institutionId, createdAt, updatedAt
		})
	}

	toJSON (entity: PastQuestionEntity): PastQuestionToModel {
		return {
			question: entity.question,
			questionMedia: entity.questionMedia,
			courseId: entity.courseId,
			year: entity.year,
			data: entity.data,
			institutionId: entity.institutionId
		}
	}
}
