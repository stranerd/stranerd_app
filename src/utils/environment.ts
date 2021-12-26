export const appName = 'stranerd'
export const isDev = process.env.VUE_APP_API_ENVIRONMENT === 'local'

export const isServer = () => false
export const isClient = () => true

export const googleClientId = process.env.VUE_APP_API_GOOGLE_CLIENT_ID ?? ''

const host = (process.env.VUE_APP_API_DOMAIN ?? '') + (isDev ? `:${process.env.VUE_APP_API_PORT}` : '')
export const domain = `http${!isDev ? 's' : ''}://${host}`
export const logo = `${domain}/images/logo-blue.svg`

const apis = JSON.parse(process.env.VUE_APP_API_API_BASES ?? '{}')
export const apiBases = {
	AUTH: apis.auth,
	STRANERD: apis.stranerd,
	UTILS: apis.utils
}
