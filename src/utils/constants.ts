import { Capacitor } from '@capacitor/core'

export const ACCESS_TOKEN_NAME = 'access-token'
export const REFRESH_TOKEN_NAME = 'refresh-token'
export const REDIRECT_SESSION_NAME = 'redirect-to'

export const PAGINATION_LIMIT = 20
export const CHAT_PAGINATION_LIMIT = 20
export const SEARCH_PAGINATION_LIMIT = 50

export const DEFAULT_PROFILE_PHOTO = '/images/avatars/user_profile.svg'

export const isWeb = Capacitor.getPlatform() === 'web'
export const isIos = Capacitor.getPlatform() === 'ios'
export const isAndroid = Capacitor.getPlatform() === 'android'

const startYear = 1980
const endYear = 2025
export const years = new Array(1 + endYear - startYear).fill(0).map((_, idx) => startYear + idx)
