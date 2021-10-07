<template>
	<router-link :to="`/dashboard/${props.tab}`" class="flex flex-col rounded-l-[150px] text-icon_inactive cursor-pointer text-sm hover:text-dark_gray mb-2">
		<div :class="`${props.route.name == props.tab ? 'flex' : 'hidden' } flex bg-white flex-row-reverse`">
			<div class="w-1/2 rounded-br-[150px] py-2 bg-light_gray">
			</div>
			<div class="w-1/2  py-2 bg-light_gray">
			</div>
		</div>
		<div :class="`py-3 flex flex-row px-4 items-center ${props.route.name == props.tab ? 'text-dark_gray bg-white' : '' }   rounded-l-3xl`">
			<ion-icon :icon="props.icon" class="text-[21px] mr-4" ></ion-icon>
			<span class="font-semibold  capitalize">{{props.tab}}</span>
		</div>
		<div :class="`${props.route.name == props.tab ? 'flex' : 'hidden' }  bg-white flex-row-reverse`">
			<div class="w-1/2 rounded-tr-[150px] py-2 bg-light_gray">
			</div>
			<div class="w-1/2  py-2 bg-light_gray">
			</div>
		</div>
	</router-link>
</template>
<script lang="ts">
import { defineComponent,  Ref } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export default defineComponent({
	props: {
		route: {},
		tab: String,
		icon: {}
	},
	setup(props) {
		return {
			props
		}
	},
})
</script>
