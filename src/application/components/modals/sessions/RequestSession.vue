<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-3 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">
		<div class="py-1 text-center flex md:flex-row flex-col items-center font-semibold justify-center">
			<span class="mr-2 text-main_dark ">You are requesting a session from</span>
			<div class="flex flex-row items-center py-1">
				<img class="inline h-4 mr-2" src="@app/assets/images/icons/person-circle.svg" />
				<span class="mr-2 text-primary">{{ newSessionTutorIdBio?.user.fullName ?? '' }}</span>
			</div>
		</div>

		<div class="mt-3 border border-faded_gray rounded-lg py-1 px-3">
			<ion-textarea v-model="factory.message" class="bg-white border-0 focus:outline-none text-center  w-full"
				placeholder="Explain exactly what you need help with."
				rows="5"></ion-textarea>
		</div>

		<div
			class="mt-3 rounded-lg py-5 px-3 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
			<ion-icon :icon="document" class="text-[22px]"></ion-icon>
			<input
				id="documents" class="cursor-pointer w-full h-full absolute"
				name="documents"
				style="opacity:0; overflow:hidden; position:absolute;"
				type="file" />
			<p class="mt-3">
				Add images or documents <b>(Optional)</b>
			</p>
		</div>

		<div class="mt-3 py-1 px-2 bg-light_gray rounded-lg flex flex-row">
			<ion-select class="w-full  font-medium" interface="action-sheet" placeholder="Select the subject">
				<ion-select-option value="maths">Mathematics</ion-select-option>
				<ion-select-option value="physics">Physics</ion-select-option>
				<ion-select-option value="bio">Biology</ion-select-option>
				<ion-select-option value="geo">Geography</ion-select-option>
				<ion-select-option value="business">Business</ion-select-option>
				<ion-select-option value="civil">Civil Right</ion-select-option>
			</ion-select>
		</div>

		<div class="mt-3 py-2 px-2 flex md:flex-row flex-col md:items-center">
			<span class="mr-2 font-semibold text-main_dark">Schedule start:</span>
			<div class="flex flex-row items-center gap-3 mt-2 md:mt-0">
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipse" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Now </span>
				</div>
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipseOutline" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Later </span>
				</div>
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipseOutline" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Tutor Openings </span>
				</div>
			</div>
		</div>

		<div class="mt-3 py-1 px-2 bg-light_gray rounded-lg flex flex-row">
			<ion-select v-model="factory.duration" class="w-full  font-medium" interface="action-sheet"
				placeholder="Duration and payment">
				<ion-select-option v-for="option in factory.prices" :key="option.duration" :value="option.duration">{{
					option.duration
				}} minutes - {{ option.price }} gold coins
				</ion-select-option>
			</ion-select>
		</div>

		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 py-3 relative ion-activatable rounded-lg w-full font-bold bg-dark_gray "
					@click="closeSessionModal">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button :disabled="loading || !factory.valid"
					class=" px-6 relative ion-activatable font-bold w-full py-3 rounded-lg bg-primary"
					@click="createSession">
					Request Session
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { IonIcon, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue'
import { document, ellipse, ellipseOutline } from 'ionicons/icons'
import { analytics } from '@modules/core'
import { useCreateSession } from '@app/composable/sessions/sessions'
import { useSessionModal } from '@app/composable/core/modals'

export default defineComponent({
	setup () {
		const closeSessionModal = () => {
			useSessionModal().closeCreateSession()
		}
		const { factory, loading, error, createSession, newSessionTutorIdBio } = useCreateSession()
		onMounted(async () => {
			await analytics.logEvent('view_session_request')
		})

		return {
			closeSessionModal,
			document,
			ellipse,
			ellipseOutline,
			factory, loading, error, createSession, newSessionTutorIdBio
		}
	},
	components: { IonTextarea, IonSelectOption, IonSelect, IonIcon }
})
</script>
<style scoped>
	ion-textarea {
		--placeholder-color: #8B9EB1;
	}

	ion-select {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}


</style>
