import {

	isExtractedHTMLLongerThanX,

	isString
} from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { AnnouncementEntity } from '../entities/announcement'
import { AnnouncementToModel } from '../../data/models/announcement'

type Keys = {
	body: string, 
}

export class AnnouncementFactory extends BaseFactory<AnnouncementEntity, AnnouncementToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
	
	}
    
    reserved = []

    constructor () {
    	super({ body: '', })
    }

    get body () {
    	return this.values.body
    }

    set body (value: string) {
    	this.set('body', value)
    }

	loadEntity = (entity: AnnouncementEntity) => {
		this.body = entity.body
	
	}
    
    	toModel = async () => {
    		if (this.valid) {
	
    			const { body } = this.validValues
    			return {body }
    		} else {
    			throw new Error('Validation errors')
    		}
    	}


}
