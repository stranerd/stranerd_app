declare module '*.vue' {
	import { defineComponent } from '@nuxtjs/composition-api'
	export default defineComponent({}) as ReturnType<defineComponent>
}
