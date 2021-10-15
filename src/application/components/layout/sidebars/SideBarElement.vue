<template>
	<router-link :to="props.tab != 'schedule' ? `/dashboard/${props.tab}` : '/schedule/calendar'" @click="store.commit('hideIonPage')" class="flex flex-col rounded-l-[150px] text-icon_inactive cursor-pointer text-sm hover:text-dark_gray mb-2">
		<div :class="`${props.route.path.includes(props.tab) ? 'flex' : 'hidden' } flex bg-white flex-row-reverse`">
			<div class="w-1/2 rounded-br-[150px] py-2 bg-light_gray">
			</div>
			<div class="w-1/2  py-2 bg-light_gray">
			</div>
		</div>
		<div :class="`py-3 flex flex-row px-4 items-center ${props.route.path.includes(props.tab) ? 'text-dark_gray bg-white' : '' }   rounded-l-3xl`">
			<ion-icon :icon="props.icon" class="text-[23px] mr-4" ></ion-icon>
			<span class="font-semibold  capitalize">{{props.tab}}</span>
		</div>
		<div :class="`${props.route.path.includes(props.tab) ? 'flex' : 'hidden' }  bg-white flex-row-reverse`">
			<div class="w-1/2 rounded-tr-[150px] py-2 bg-light_gray">
			</div> 
			<div class="w-1/2  py-2 bg-light_gray">
			</div>
		</div>
	</router-link>
</template>
<script lang="ts">
import { useStore } from '@/application/store'
import { IonIcon } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		route: {},
		tab: String,
		icon: {}
	},
	setup(props) {
		const store = useStore()
		return {
			props,
			store
		}
	},
	components: {
		IonIcon
	}
})
</script>
