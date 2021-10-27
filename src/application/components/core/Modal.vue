<template>
	<transition name="slide" appear>
		<div class="fixed top-0 w-screen h-screen bg-modal_bg z-50 bg-opacity-20 flex flex-col px-4 overflow-y-auto" v-if="showModal" >
			<div class="py-3 fixed flex flex-row-reverse w-full top-0 right-3 cursor-pointer z-50" @click="showModal = false">
				<ion-icon class="text-white text-[23px] md:text-[30px]" :icon="closeOutline"></ion-icon>
			</div>
			<div class="py-3 relative  w-full flex flex-row justify-center items-center h-full">
				<div class=" w-full grid grid-cols-12">
					<request-session v-if="componentName == 'requestSession'"></request-session>
					<buy-coins v-if="componentName == 'buyCoins'" ></buy-coins>
					<create-schedule v-if="componentName ==  'createSchedule'" ></create-schedule>
					<withdrawal v-if="componentName == 'withdrawal'"></withdrawal>
				</div>
				<photo-view v-if="componentName == 'photoView'"></photo-view>
			</div>
		</div> 
	</transition>
</template>

<script lang="ts">
import { showModal, toggleModal, componentName } from '../../composable/core/Modal'

import { IonIcon } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'
import { defineAsyncComponent } from 'vue'

const RequestSession = defineAsyncComponent(() => import('@/application/components/tutors/RequestSession.vue'))
const BuyCoins = defineAsyncComponent(() => import('@/application/components/wallet/BuyCoins.vue'))
const CreateSchedule = defineAsyncComponent(() => import('@/application/components/schedule/CreateSchedule.vue'))
const Withdrawal = defineAsyncComponent(() => import('@/application/components/wallet/Withdrawal.vue'))
const PhotoView = defineAsyncComponent(() => import('@/application/components/core/PhotoView.vue'))

export default {
	name: 'modal',
	props: {
		hasCloseIcon: {
			type: Boolean,
			default: false
		}
	},
	components: { IonIcon, RequestSession, BuyCoins, CreateSchedule, Withdrawal, PhotoView },
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
