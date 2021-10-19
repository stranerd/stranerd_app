export const appName = 'stranerd'
export const isDev = process.env.ENVIRONMENT === 'local'

export const isServer = () => false
export const isClient = () => true

export const googleClientId = process.env.GOOGLE_CLIENT_ID ?? ''

export const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG ?? '{}')

const flutterwave = JSON.parse(process.env.FLUTTERWAVE ?? '{}')
export const flutterwaveConfig = {
	publicKey: flutterwave.publicKey
}

const stripe = JSON.parse(process.env.STRIPE ?? '{}')
export const stripeConfig = {
	publicKey: stripe.publicKey
}

const host = (process.env.DOMAIN ?? '') + (isDev ? `:${process.env.PORT}` : '')
export const domain = `http${!isDev ? 's' : ''}://${host}`
export const logo = `${domain}/images/logo-blue.svg`

const apis = JSON.parse(process.env.API_BASES ?? '{}')
export const apiBases = {
	AUTH: `${process.env.VUE_APP_API_AUTH}`,
	STRANERD: `${process.env.VUE_APP_API_STRANERD}`,
	STORAGE: `${process.env.VUE_APP_API_STORAGE}`
}
