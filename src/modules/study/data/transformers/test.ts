import { TestFromModel, TestToModel } from '../models/test'
import { TestEntity } from '../../domain/entities/test'

export class TestTransformer {
	fromJSON (model: TestFromModel) {
		const { id, questions, answers, score, done, data, userId, prepId, createdAt, updatedAt } = model
		return new TestEntity({
			id, questions, answers, score, done, data, userId, prepId, createdAt, updatedAt
		})
	}

	toJSON (entity: TestEntity): TestToModel {
		return {
			prepId: entity.prepId,
			type: entity.data.type
		}
	}
}
