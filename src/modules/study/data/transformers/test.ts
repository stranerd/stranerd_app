import { TestFromModel, TestToModel } from '../models/test'
import { TestEntity } from '../../domain/entities/test'

export class TestTransformer {
	fromJSON (model: TestFromModel) {
		const { id, name, questions, answers, score, done, data, userId, prepId, createdAt, updatedAt } = model
		return new TestEntity({
			id, name, questions, answers, score, done, data, userId, prepId, createdAt, updatedAt
		})
	}

	toJSON (entity: TestEntity): TestToModel {
		return {
			name: entity.name,
			prepId: entity.prepId,
			data: entity.data
		}
	}
}
