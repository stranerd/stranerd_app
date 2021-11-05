import { parseLoggedInUser } from './parseLoggedInUser'

export const setupPlugins = async () => {
	await parseLoggedInUser()
}
