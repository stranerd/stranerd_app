import { RouteLocationNormalized } from 'vue-router'

let setId = ''

export const getQuerySetId = () => setId

export const setQuerySetId = (from: RouteLocationNormalized) => {
	setId = from.params.setId ? from.params.setId.toString() : ''
}
