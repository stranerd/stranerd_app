import { EmitTypes } from '../../services/sockets'

export type Listeners<Model> = {
	[EmitTypes.created]: (model: Model) => Promise<void>
	[EmitTypes.updated]: (model: Model) => Promise<void>
	[EmitTypes.deleted]: (model: Model) => Promise<void>
}
