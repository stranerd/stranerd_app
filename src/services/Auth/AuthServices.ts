import {$simpleAuthHeader} from '@/services/orgRepository'

export const SetToken = (accessToken: string, refreshToken: string)=>{
	$simpleAuthHeader['Access-Token'] = accessToken
	$simpleAuthHeader['Refresh-Token'] = refreshToken
	localStorage.setItem('accessToken', accessToken)
	localStorage.setItem('refreshToken', refreshToken)
}