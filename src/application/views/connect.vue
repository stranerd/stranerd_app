<template>
	<DefaultLayout>
		<div>
			<div class="flex flex-col items-start border-bottom-line card-padding">
				<IonText class="text-lg">An easy way to work with students from other schools.</IonText>
				<IonText class="text-secondaryText">
					Stranerd connect makes communicating and collaborating with students from other schools easier.
				</IonText>
				<IonButton class="btn-primary mt-2" @click="openModal()">
					See how Stranerd Connect works
				</IonButton>
			</div>
			<div class="flex flex-col !gap-4 card-padding border-bottom-line">
				<IonText class="font-bold">How do you want to connect?</IonText>
				<div v-for="{ icon, title, sub } in [
					{ icon: personOutline, title: 'Student connect', sub: '1 on 1 discussion with any student.' },
					{ icon: peopleOutline, title: 'Class connect', sub: 'Class to class discussion with any class.' },
				]" :key="title" class="flex rounded-xl gap-4 items-center border border-itemBg p-4 cursor-pointer">
					<IonIcon :icon="icon" />
					<div class="flex flex-col gap-1">
						<IonText>{{ title }}</IonText>
						<IonText class="text-sm text-secondaryText">{{ sub }}</IonText>
					</div>
				</div>
			</div>
			<IonModal :isOpen="isOpen" cssClass="modal-class" @didDismiss="closeModal()">
				<div class="modal-content p-6">
					<div class="flex flex-col gap-4 items-center text-center">
						<template v-if="tab === 0">
							<IonIcon :icon="informationCircleOutline" class="text-4xl text-info" />
							<IonText class="font-bold text-lg">Send a request</IonText>
							<IonText class="text-secondaryText">
								Request a connection with a student or a class, via name or email. A discussion is
								opened with the student or class once the request is accepted.
							</IonText>
							<IonButton class="btn-primary w-full" @click="closeModal()">Got it</IonButton>
						</template>
					</div>
				</div>
			</IonModal>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { alertCircleOutline, informationCircleOutline, peopleOutline, personOutline } from 'ionicons/icons'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Connect',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Stranerd Connect', {})
		const isOpen = ref(false)
		const tab = ref(0)
		const openModal = (t = 0) => {
			isOpen.value = true
			tab.value = t
		}
		const closeModal = () => {
			isOpen.value = false
		}
		return {
			peopleOutline, personOutline, alertCircleOutline, informationCircleOutline,
			isOpen, tab, openModal, closeModal
		}
	}
})
</script>

<style lang="scss" scoped>
	.modal-class {
		--width: auto;
		--max-width: calc(100vw - 2rem);
		--border-radius: 1rem;
	}
</style>
