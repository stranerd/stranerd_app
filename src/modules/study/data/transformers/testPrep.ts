import { TestPrepFromModel, TestPrepToModel } from '../models/testPrep'
import { TestPrepEntity } from '../../domain/entities/testPrep'

export class TestPrepTransformer {
	fromJSON (model: TestPrepFromModel) {
		const { id, name, data, questions, time, createdAt, updatedAt } = model
		return new TestPrepEntity({
			id, name, data, questions, time, createdAt, updatedAt
		})
	}

	toJSON (entity: TestPrepEntity): TestPrepToModel {
		return {
			name: entity.name,
			questions: entity.questions,
			time: entity.time,
			data: entity.data
		}
	}
}
