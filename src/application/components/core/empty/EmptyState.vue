<template>
	<div class="w-full flex flex-col items-center justify-center card-sm card-padding">
		<p class="w-full" v-html="info" />
		<slot>
			<router-link v-if="btnText && route" :class="btnTextClass" :to="route"
				class="py-3 px-7 border border-bodyText font-bold rounded-xl">
				{{ btnText }}
			</router-link>
			<IonButton v-else-if="btnText && onClick"
				class="py-3 px-7 border border-bodyText font-bold rounded-xl">
				{{ btnText }}
			</IonButton>
		</slot>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
	onClick: {
		type: Function as PropType<() => Promise<void>>
	},
	info: {
		type: String
	},
	route: {
		type: String
	},
	btnText: {
		type: String
	},
	btnTextClass: {
		type: String
	}
})
</script>
