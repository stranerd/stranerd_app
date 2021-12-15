<template>
	<div
		class="bg-primary h-40 h-36 rounded-b-xl sm:rounded-3xl flex flex-col sm:flex-row justify-between sm:items-center p-8">
		<div class="flex flex-col w-full text-left">

			<ion-text class="text-white leading-tight text-3xl font-bold">
				Your library
			</ion-text>
			<ion-text class="text-white text-base font-bold">
				Collection of your created and saved study materials
			</ion-text>
		</div>

		<div class="bg-white p-3 px-6 rounded-xl lg:grid place-items-center cursor-pointer hidden"
			@click="setOpen(true, $event)">
			<div class="flex items-center cursor-pointer">
				<ion-text class="text-primary mr-1 font-bold">
					Create
				</ion-text>
				<ion-icon
					:icon=' !isOpenRef ? chevronDown : chevronUp'
					class="text-primary  text-xl"
				/>
			</div>
		</div>

		<ion-popover
			:event="event"
			:is-open="isOpenRef"
			:translucent="true"
			css-class="pt-8 rounded-xl"
			@didDismiss="setOpen(false)"
		>
			<div class="flex flex-col  p-6 !w-52">
				<router-link class="flex items-center justify-start w-auto mb-4 cursor-pointer"
					to="/study/flashCards/create">
					<ion-icon :icon="flash" alt="" class=" text-2xl text-main_dark" />
					<ion-text class="font-bold ml-4 text-lg text-main_dark">
						Flashcard
					</ion-text>
				</router-link>
				<router-link class="flex items-center justify-start w-auto cursor-pointer"
					to="/study/set/create">
					<ion-icon :icon="folder" alt="" class=" text-2xl text-main_dark" />
					<ion-text class="font-bold ml-4 text-lg text-main_dark">
						Study set
					</ion-text>
				</router-link>
			</div>

		</ion-popover>
	</div>
</template>

<script lang="ts">
import { IonPopover } from '@ionic/vue'
import { useAuth } from '@root/application/composable/auth/auth'
import { chevronDown, chevronUp, flash, folder } from 'ionicons/icons'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'StudyHeader',
	components: {
		IonPopover
	},

	setup () {
		const { user } = useAuth()
		const isOpenRef = ref(false)
		const event = ref()
		const setOpen = (state: boolean, ev?: Event) => {
			event.value = ev
			isOpenRef.value = state
		}

		return {
			user, chevronDown, chevronUp, isOpenRef, setOpen, event, folder, flash

		}
	}

})
</script>

<style scoped>
	ion-popover::part(content) {
		width: auto !important;
	}
</style>
