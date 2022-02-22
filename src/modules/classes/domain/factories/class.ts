import {

	isExtractedHTMLLongerThanX,

	isString
} from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { ClassEntity } from '../entities/class'
import { ClassToModel } from '../../data/models/class'

type Keys = {
	name: string, 
}

export class ClassFactory extends BaseFactory<ClassEntity, ClassToModel, Keys> {
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

	loadEntity = (entity: ClassEntity) => {
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
