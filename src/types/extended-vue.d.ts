import 'vue'
import { Middleware } from '@app/router'

declare module 'vue' {
	export interface ComponentOptionsBase {
		displayName?: string
		middlewares?: Middleware[]
	}
}
