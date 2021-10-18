import axios from 'axios'

// Org Repository

const $API_GATEWAY_STRANERD = `${process.env.VUE_APP_API_STRANERD}`
const $API_GATEWAY_AUTH = `${process.env.VUE_APP_API_AUTH}`
const $API_GATEWAY_STORAGE = `${process.env.VUE_APP_API_STORAGE}`

// const urlParams = new URLSearchParams(window.location.search)
// const linchpin = urlParams.get('linchpin')

export const $simpleAuthHeader = {
	Accept: 'application/json',
	authorization: localStorage.getItem('accessToken'),
}

// let $orgId = ''
// let authUser = ''
// if (JSON.parse(localStorage.getItem('linchpin')) !== null) {
// 	$orgId = JSON.parse(localStorage.getItem('linchpin')).org.id
// 	authUser = JSON.parse(localStorage.getItem('linchpin')).user
// }
// export const OrgId = $orgId
// export const $AuthUser = authUser

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


AxiosStranerd.interceptors.response.use(
	(response) => response,
	(err) => {console.log(err)},
)
