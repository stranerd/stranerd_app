<template>
	<div
		class="w-full rounded-xl bg-white  flex flex-col items-center justify-center py-7 px-5 md:py-11 gap-3 text-center normalText text-main_dark">

		<p v-html="info" :class="infoClass"/>

		<router-link v-if="btnText && link" :to="route"  :class="btnTextClass" 
			class="py-3 px-7 border-[1px] border-solid border-dark_gray rounded-lg">
			{{ btnText }}
		</router-link>

		<ion-button class="btn-outline text-gray"  @click="onClick(funcParams)"> 
			{{ btnText }}
		</ion-button>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Emptystate',
	props: {
		funcParams: {
			type: String
		},
		onClick: {
			type: Function
		},
		link: {
			type: String
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

	},



})
</script>
