import {$simpleAuthHeader} from '@/services/orgRepository'

export const SetToken = (accessToken: string, resetToken: string)=>{
	$simpleAuthHeader.authorization = accessToken
	localStorage.setItem('accessToken', accessToken)
	localStorage.setItem('resetToken', resetToken)
}