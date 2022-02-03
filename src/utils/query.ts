import { RouteLocationNormalized } from 'vue-router'

let setId = null as string | null

export const getQuerySetId = () => setId
export const getSetIdQuery = () => setId ? ({ setId }) : ({})

export const setQuerySetId = (from: RouteLocationNormalized) => {
	setId = from.params.setId ? from.params.setId.toString() : null
}
