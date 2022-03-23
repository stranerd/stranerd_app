import 'vue'
import 'vue-router'
import { Middleware } from '@app/router'

declare module 'vue' {
	export interface ComponentOptionsBase {
		displayName?: string
		middlewares?: Middleware[]
	}
}

declare module 'vue-router' {
	interface RouteMeta {
		middlewares?: Middleware[]
		displayName?: string
	}
}
