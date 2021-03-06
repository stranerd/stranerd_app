import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionTransformer {
	fromJSON (model: SessionFromModel) {
		const {
			id, duration, price, message, student, tutor,
			accepted, done, cancelled,
			createdAt, endedAt, startedAt, updatedAt
		} = model
		return new SessionEntity({
			id, duration, price, message, student, tutor,
			accepted, done, cancelled,
			createdAt, endedAt, startedAt, updatedAt
		})
	}

	toJSON (entity: SessionEntity): SessionToModel {
		return {
			message: entity.message,
			tutorId: entity.tutor.id,
			duration: entity.duration
		}
	}
}
