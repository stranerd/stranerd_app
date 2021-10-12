<template>
	<transition name="slide" appear>
		<div class="fixed top-0 w-screen h-screen bg-modal_bg  bg-opacity-20 flex flex-col px-4 overflow-y-auto" v-if="showModal" >
			<div class="py-3  flex flex-row-reverse sticky top-0 cursor-pointer" @click="showModal = false">
				<ion-icon class="text-white text-[23px] md:text-[30px]" :icon="closeOutline"></ion-icon>
			</div>
			<div class="py-3  md:mt-5 mt-2 w-full grid grid-cols-12">
				<request-session v-if="componentName == 'requestSession'"></request-session>
				<buy-coins v-if="componentName == 'buyCoins'" ></buy-coins>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { showModal, toggleModal, componentName } from '../../../modules/Modal'

import { IonIcon } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'
import { defineAsyncComponent } from 'vue'

const RequestSession = defineAsyncComponent(() => import('@/application/components/tutors/RequestSession.vue'))
const BuyCoins = defineAsyncComponent(() => import('@/application/components/wallet/BuyCoins.vue'))

export default {
	name: 'modal',
	props: {
		hasCloseIcon: {
			type: Boolean,
			default: false
		}
	},
	components: { IonIcon, RequestSession, BuyCoins },
	setup(props: any) {

		return {
			showModal,
			props,
			toggleModal,
			closeOutline,
			componentName
		}

	}
}
</script>
