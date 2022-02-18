import { parseURL } from '@utils/commons'

export const appName = 'stranerd'
export const isDev = process.env.VUE_APP_API_ENVIRONMENT === 'local'

export const isServer = () => false
export const isClient = () => true

const googleClients = JSON.parse(process.env.VUE_APP_API_GOOGLE_CLIENT_IDS ?? '{}')
export const googleClientIds = {
	web: googleClients.web ?? '',
	android: googleClients.android ?? '',
	ios: googleClients.ios ?? ''
}

export const googleClientId = googleClientIds.web

const host = parseURL((process.env.VUE_APP_API_DOMAIN ?? '') + (isDev ? `:${process.env.VUE_APP_API_PORT}` : ''))
export const domain = `http${!isDev ? 's' : ''}://${host}`

const apis = JSON.parse(process.env.VUE_APP_API_API_BASES ?? '{}')
export const apiBases = {
	AUTH: parseURL(apis.auth),
	STRANERD: parseURL(apis.stranerd),
	UTILS: parseURL(apis.utils)
}
