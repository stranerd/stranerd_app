import Cookie from 'cookie'

export const serializeToCookie = (name: string, value: string, ttlInSecs = 3600) => Cookie.serialize(name, value, {
	maxAge: ttlInSecs,
	path: '/',
	sameSite: 'lax',
	secure: true
})

export const parseCookie = (value: string) => Cookie.parse(value)
