// import axios from 'axios'

// // Org Repository

// // const $API_GATEWAY_Stranerd = `${process.env.VUE_APP_API_GATEWAY_ENDPOINT}/auth/`
// // const $API_GATEWAY_AAA = `${process.env.VUE_APP_API_GATEWAY_ENDPOINT}/`

// const urlParams = new URLSearchParams(window.location.search)
// const linchpin = urlParams.get('linchpin')

// export const $simpleAuthHeader = {
// 	Accept: 'application/json',
// 	authorization: typeof linchpin === 'string' ? linchpin : localStorage.getItem('token'),
// }

// let $orgId = ''
// let authUser = ''
// if (JSON.parse(localStorage.getItem('linchpin')) !== null) {
// 	$orgId = JSON.parse(localStorage.getItem('linchpin')).org.id
// 	authUser = JSON.parse(localStorage.getItem('linchpin')).user
// }
// export const OrgId = $orgId
// export const $AuthUser = authUser

// export const AxiosStranerd = axios.create({
// 	baseURL: $API_GATEWAY_Stranerd,
// 	headers: $simpleAuthHeader,
// })
// export const AxiosPerformance = axios.create({
// 	baseURL: $API_GATEWAY_PERFORMANCE,
// 	headers: $simpleAuthHeader,
// })
// export const AxiosAAA = axios.create({
// 	baseURL: $API_GATEWAY_AAA,
// 	headers: $simpleAuthHeader,
// })
// AxiosStranerd.interceptors.response.use(
// 	(response) => response,
// 	// eslint-disable-next-line consistent-return
// 	(err) => {
// 		if (err.response.status === 401 && err.response.data === 'Unauthorized') {
// 			// if you ever get an unauthorized, logout the user
// 			window.location.assign(process.env.VUE_APP_CLOUDENLY)
// 			// you can also redirect to /login if needed !
// 		}
// 	},
// )
