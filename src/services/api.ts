import {
	AxiosAuth,
	$simpleAuthHeader
} from './orgRepository'


export	const signIn = (payload: any)=> {
	const url = '/emails/signin'
	return AxiosAuth.post(url, payload)
}
export	const signUp = (payload: any)=> {
	const url = '/emails/signup'
	return AxiosAuth.post(url, payload)
}
export	const sendVerificationMail = (payload: any)=> {
	const url = '/emails/sendVerificationMail'
	return AxiosAuth.post(url, payload)
}
export	const verify = (payload: any)=> {
	const url = '/emails/verify'
	return AxiosAuth.post(url, payload)
}
export	const token = ()=> {
	const url = '/token'
	return AxiosAuth.post(url)
}
export	const roles = (payload: any)=> {
	const url = '/roles'
	return AxiosAuth.post(url, payload)
}
export	const getUser = ()=> {
	const url = '/user'
	console.log($simpleAuthHeader)
	return AxiosAuth.get(url)
}
export	const updateUser = (payload: any)=> {
	const url = '/user'
	return AxiosAuth.put(url, payload)
}
export const signOut= ()=> {
	const url = '/signout'
	return AxiosAuth.post(url)
}
export const sendResetMail= ()=> {
	const url = '/passwords/sendResetMail'
	return AxiosAuth.post(url)
}
export const resetPassword= ()=> {
	const url = '/passwords/reset'
	return AxiosAuth.post(url)
}
export const updatePassword= ()=> {
	const url = '/passwords/update'
	return AxiosAuth.post(url)
}
export const googleAuth = ()=> {
	const url = '/identities/google'
	return AxiosAuth.post(url)
}


