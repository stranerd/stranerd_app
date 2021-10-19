import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionTransformer {
	fromJSON (model: SessionFromModel) {
		const {
			id, duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted, done, cancelled,
			createdAt, endedAt, startedAt, updatedAt, taskId
		} = model
		return new SessionEntity({
			id, duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted, done, cancelled,
			createdAt, endedAt, startedAt, updatedAt, taskId
		})
	}

	toJSON (entity: SessionEntity): SessionToModel {
		return {
			message: entity.message,
			tutorId: entity.tutorId,
			duration: entity.duration
		}
	}
}
