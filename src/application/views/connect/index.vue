<template>
	<DefaultLayout>
		<div class="showcase-flex">
			<div class="flex flex-col items-center text-center border-bottom-line card-padding">
				<img alt="" src="@app/assets/images/connect.svg">
				<IonText class="text-xl px-5 mt-5">An easy way to work with students from other schools.</IonText>
				<IonText class="text-secondaryText">
					Stranerd connect makes communicating and collaborating with students from other schools easier.
				</IonText>
				<IonButton class="btn-primary mt-2 font-normal" @click="openModal()">
					<IonIcon :icon="bulb" class="text-warning mr-3" />
					See how Stranerd Connect works
				</IonButton>
			</div>
			<div class="w-full h-px bg-itemBg "></div>

			<IonText class="font-bold text-center mt-5">How do you want to connect?</IonText>

			<div class="flex flex-col !gap-4 card-padding w-full">

				<div class="flex gap-3 w-full">
					<div v-for="{ icon, title, sub, tab } in [
							{ icon: personOutline, title: 'Student connect', sub: '1 on 1 discussion with any student.',tab: 1 },
							{ icon: peopleOutline, title: 'Class connect', sub: 'Class to class discussion with any class.', tab: 2 },
						]" :key="title"
						class="flex flex-col text-center rounded-xl gap-4 items-center border border-itemBg p-4 cursor-pointer flex-1"
						@click="openModal(tab)">
						<IonIcon :icon="icon" />
						<div class="flex flex-col gap-1">
							<IonText>{{ title }}</IonText>
							<IonText class="text-sm text-secondaryText">{{ sub }}</IonText>
						</div>
					</div>
				</div>

			</div>
			<IonModal :isOpen="isOpen" cssClass="modal-class" @didDismiss="closeModal">
				<div class="modal-content p-6 lg:p-8">
					<div class="flex flex-col gap-2 items-center">
						<template v-if="tab === 0">
							<IonIcon :icon="informationCircleOutline" class="text-5xl text-info" />
							<IonText class="font-bold text-lg">Send a request</IonText>
							<IonText class="text-secondaryText text-center">
								Request a connection with a student or a class, via name or email. A discussion is
								opened with the student or class once the request is accepted.
							</IonText>
							<IonButton class="btn-primary w-full mt-2" @click="closeModal()">Got it</IonButton>
						</template>
						<template v-if="tab === 1">
							<div class="w-full flex justify-between items-center text-lg">
								<IonText class="font-bold">Student Connect</IonText>
								<IonIcon :icon="closeOutline" @click="closeModal" />

							</div>
							<IonText class="w-full text-secondaryText">
								Start a discussion with a student in another class.
								Send and get notified immediately it is accepted.
							</IonText>
							<IonInput v-model="searchTerm" class="w-full mt-2" placeholder="Enter email or name" />
							<IonButton class="btn-primary w-full mt-2" @click="searchUsers">Send Request</IonButton>
						</template>
						<template v-if="tab === 2">
							<IonIcon :icon="informationCircleOutline" class="text-5xl text-info" />
							<IonText class="font-bold text-lg">Coming Soon</IonText>
							<IonText class="text-secondaryText text-center">
								Class to class discussion with any class.
							</IonText>
							<IonButton class="btn-primary w-full mt-2" @click="closeModal()">Got it</IonButton>
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
import {
	alertCircleOutline,
	bulb,
	closeOutline,
	informationCircleOutline,
	peopleOutline,
	personOutline
} from 'ionicons/icons'
import { generateMiddlewares } from '@app/middlewares'
import { useSearch } from '@app/composable/meta/search'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'Connect',
	beforeRouteEnter: generateMiddlewares([ 'isAuthenticated' ]),
	setup () {
		useRouteMeta('Stranerd Connect', { back: true })
		const router = useRouter()
		const { searchTerm, search } = useSearch()
		const isOpen = ref(false)
		const tab = ref(0)
		const openModal = (t = 0) => {
			isOpen.value = true
			tab.value = t
		}
		const closeModal = () => {
			isOpen.value = false
		}
		searchTerm.value = ''
		const searchUsers = async () => {
			closeModal()
			await router.push(`/search/users?search=${ searchTerm.value }`)
			await search()
		}
		return {
			peopleOutline, personOutline, alertCircleOutline, informationCircleOutline,
			closeOutline, isOpen, tab, openModal, closeModal, searchTerm, searchUsers, bulb
		}
	}
})
</script>

<style lang="scss" scoped>
.modal-class {
	--max-width: calc(100vw - 2rem);
}
</style>
