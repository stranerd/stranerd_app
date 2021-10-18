import axios from 'axios'

// Org Repository

const $API_GATEWAY_STRANERD = `${process.env.VUE_APP_API_STRANERD}`
const $API_GATEWAY_AUTH = `${process.env.VUE_APP_API_AUTH}`
const $API_GATEWAY_STORAGE = `${process.env.VUE_APP_API_STORAGE}`



export const $simpleAuthHeader = {
	'Access-Token': localStorage.getItem('accessToken'),
	'Refresh-Token': localStorage.getItem('refreshToken'),
}




export const AxiosStranerd = axios.create({
	baseURL: $API_GATEWAY_STRANERD,
	headers: $simpleAuthHeader,
})
export const AxiosAuth = axios.create({
	baseURL: $API_GATEWAY_AUTH,
	headers: $simpleAuthHeader,
})
export const AxiosStorage = axios.create({
	baseURL: $API_GATEWAY_STORAGE,
	headers: $simpleAuthHeader,
})


AxiosAuth.interceptors.request.use(
	(request)=>{
		console.log(request)
		return request
	}
)
AxiosAuth.interceptors.response.use(
	(response) =>{
		response
		console.log(axios.interceptors.response)	
	},
	(err) => {
		console.log(axios.interceptors.request)	
		console.log(err)},
)
