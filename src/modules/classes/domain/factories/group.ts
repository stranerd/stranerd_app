import {
	isExtractedHTMLLongerThanX,
	isString
} from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { GroupEntity } from '../entities/group'
import { GroupToModel } from '../../data/models/group'

type Keys = {
	name: string, 
}

export class GroupFactory extends BaseFactory<GroupEntity, GroupToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
	
	}
    
    reserved = []

    constructor () {
    	super({ name: '', })
    }

    get name () {
    	return this.values.name
    }

    set name (value: string) {
    	this.set('name', value)
    }

	loadEntity = (entity: GroupEntity) => {
		this.name = entity.name
	
	}
    
    	toModel = async () => {
    		if (this.valid) {
	
    			const { name } = this.validValues
    			return {name }
    		} else {
    			throw new Error('Validation errors')
    		}
    	}


}
