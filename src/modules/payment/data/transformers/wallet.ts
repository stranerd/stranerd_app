import { WalletFromModel } from '../models/wallet'
import { WalletEntity } from '../../domain/entities/wallet'

export class WalletTransformer {
	fromJSON (model: WalletFromModel) {
		const { id, userId, balance, account, subscription, createdAt, updatedAt } = model
		return new WalletEntity({
			id, userId, balance, account, subscription, createdAt, updatedAt
		})
	}

	toJSON (entity: WalletEntity) {
		return {}
	}
}
