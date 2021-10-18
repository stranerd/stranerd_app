import {
	AxiosAuth,
} from './orgRepository'


export	const signIn = (payload: any)=> {
	const url = '/emails/signin'
	return AxiosAuth.post(url, payload)
}
export const signOut= ()=> {
	const url = '/emails/signout'
	return AxiosAuth.post(url)
}


