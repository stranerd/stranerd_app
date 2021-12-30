<template>
	<div
		class="w-full rounded-xl bg-white  flex flex-col items-center justify-center py-7 px-5 md:py-11 gap-3 text-center text-body text-main_dark">

		<p :class="infoClass" v-html="info" />

		<router-link v-if="btnText && link" :class="btnTextClass" :to="route"
			class="py-3 px-7 border-[1px] border-solid border-dark_gray rounded-lg">
			{{ btnText }}
		</router-link>

		<ion-button v-else-if="btnText && onClick" class="btn-outline text-gray" @click="onClick(funcParams)">
			{{ btnText }}
		</ion-button>
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
