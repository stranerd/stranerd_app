import 'vue'
import { Middleware } from '@root/main'

declare module 'vue' {
	export interface ComponentOptionsBase {
		displayName?: string
<<<<<<< HEAD
		layout?: string
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		middlewares?: Middleware[]
	}
}
