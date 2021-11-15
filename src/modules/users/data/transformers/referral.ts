import { ReferralFromModel, ReferralToModel } from '../models/referral'
import { ReferralEntity } from '../../domain/entities/referral'

export class ReferralTransformer {
	fromJSON (model: ReferralFromModel) {
		const { id, referred, userId, createdAt, updatedAt } = model
		return new ReferralEntity({
			id, referred, userId, createdAt, updatedAt
		})
	}

	toJSON (entity: ReferralEntity): ReferralToModel {
		return {
			referred: entity.referred
		}
	}
}
