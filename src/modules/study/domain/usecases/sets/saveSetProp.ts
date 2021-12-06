import { ISetRepository } from '../../irepositories/iset'
import { SetFromModel } from '../../../data/models/set'

export class SaveSetPropUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (setId: string, type: keyof SetFromModel['saved'], values: string[]) {
		return await this.repository.saveProp(setId, type, values)
	}
}
