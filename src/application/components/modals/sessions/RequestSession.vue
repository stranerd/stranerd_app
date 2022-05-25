<template>
	<Modal>
		<div class="py-1 text-center flex md:flex-row flex-col items-center font-semibold justify-center">
			<span class="mr-2 text-secondaryText ">You are requesting a session from</span>
			<div class="flex flex-row items-center py-1">
				<img class="inline h-4 mr-2" src="@app/assets/images/icons/person-circle.svg" />
				<span class="mr-2 text-primary">{{ newSessionTutorIdBio?.user.fullName ?? '' }}</span>
			</div>
		</div>

		<div class="mt-3 border border-faded_gray rounded-lg py-1 px-3">
			<ion-textarea v-model="factory.message" class="bg-white border-0 focus:outline-none text-center w-full"
				placeholder="Explain exactly what you need help with."
				rows="5"></ion-textarea>
		</div>

		<div class="mt-3 py-1 px-2 bg-light_gray rounded-lg flex flex-row">
			<IonSelect class="w-full font-medium" interface="action-sheet" placeholder="Select the subject">
				<IonSelectOption value="maths">Mathematics</IonSelectOption>
				<IonSelectOption value="physics">Physics</IonSelectOption>
				<IonSelectOption value="bio">Biology</IonSelectOption>
				<IonSelectOption value="geo">Geography</IonSelectOption>
				<IonSelectOption value="business">Business</IonSelectOption>
				<IonSelectOption value="civil">Civil Right</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mt-3 py-2 px-2 flex md:flex-row flex-col md:items-center">
			<span class="mr-2 font-semibold text-secondaryText">Schedule start:</span>
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
			<IonSelect v-model="factory.duration" class="w-full font-medium" interface="action-sheet"
				placeholder="Duration and payment">
				<IonSelectOption v-for="option in factory.prices" :key="option.duration" :value="option.duration">
					{{ option.duration }} minutes - {{ option.price }} gold coins
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="flex flex-row mt-5 text-white gap-4">
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

	</Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue'
import { document, ellipse, ellipseOutline } from 'ionicons/icons'
import { useCreateSession } from '@app/composable/sessions/sessions'
import { useSessionModal } from '@app/composable/core/modals'

export default defineComponent({
	setup () {
		const closeSessionModal = () => {
			useSessionModal().closeCreateSession()
		}
		const { factory, loading, error, createSession, newSessionTutorIdBio } = useCreateSession()

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
