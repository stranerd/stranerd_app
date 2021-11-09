import 'vue'
import { Middleware } from '@root/main'

declare module 'vue' {
	export interface ComponentOptionsBase {
		displayName?: string
		layout?: string
		middlewares?: Middleware[]
	}
}
