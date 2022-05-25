<template>
	<div
		class="w-full rounded-xl bg-white flex flex-col items-center justify-center p-4 md:py-8 gap-3 text-center text-secondaryText">
		<p v-html="info" />
		<slot>
			<router-link v-if="btnText && route" :class="btnTextClass" :to="route"
				class="py-3 px-7 border border-solid border-faded_gray text-gray font-bold rounded-xl">
				{{ btnText }}
			</router-link>
			<ion-button v-else-if="btnText && onClick"
				class="py-3 px-7 border border-solid border-faded_gray text-gray font-bold rounded-xl">
				{{ btnText }}
			</ion-button>
		</slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyState',
	props: {
		onClick: {
			type: Function
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
	}
})
</script>
