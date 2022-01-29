<template>
	<div
		class="w-full rounded-xl bg-white flex flex-col items-center justify-center p-4 md:py-8 gap-3 text-center text-body text-main_dark">
		<p :class="infoClass" v-html="info" class="text-body"/>
		<slot>
			<router-link v-if="btnText && route" :class="btnTextClass" :to="route"
				class="py-3 px-7 border border-solid border-faded_gray text-gray font-bold  rounded-xl">
				{{ btnText }}
			</router-link>
			<ion-button v-else-if="btnText && onClick"
				class="py-3 px-7 border border-solid border-faded_gray text-gray font-bold  rounded-xl"
				@click="onClick(funcParams)">
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
		funcParams: {
			type: Object
		},
		onClick: {
			type: Function
		},
		link: {
			type: String,
			required: false
		},
		info: {
			type: String
		},
		infoClass: {
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
