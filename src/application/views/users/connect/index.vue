<template>
	<DefaultLayout :ignorePagePadding="true">
		<div class="flex flex-col">
			<div class="border-bottom-line lg:px-8">
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
			</div>

			<div class="border-bottom-line lg:px-8 flex flex-col items-center py-6">
				<IonText class="font-bold text-center">How do you want to connect?</IonText>

				<div class="flex !gap-3 card-padding w-full">
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

			<div class="border-bottom-line lg:px-8 text-secondaryText">
				<router-link class="border-bottom-line card-padding flex items-center" to="/users/connect/requests">
					<IonIcon :icon="linkOutline" />
					<span>Connection requests</span>
					<div class="flex-1"></div>
					<span v-if="receivedConnects.length"
						:style="`width: ${receivedConnects.length.toString().length + 0.5}ch; min-width: 2ch;max-width:3.1ch;`"
						class="text-primaryText bg-primaryBg text-xs rounded-full ml-auto aspect-square flex items-center justify-center">
						<span>{{ formatNumber(receivedConnects.length) }}</span>
					</span>
				</router-link>
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
							<template v-if="fetched">
								<div v-if="!users.length" class="w-full">No users found</div>
								<SearchConnectedUser v-for="user in users" :key="user.hash" :user="user" />
							</template>
							<template v-else>
								<IonInput v-model="detail" class="w-full mt-2" placeholder="Enter email or name" />
								<IonButton :disabled="!detail" class="btn-primary w-full mt-2" @click="search">Search
								</IonButton>
							</template>
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
import { computed, defineComponent, ref } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import {
	alertCircleOutline,
	bulb,
	closeOutline,
	informationCircleOutline,
	linkOutline,
	peopleOutline,
	personOutline
} from 'ionicons/icons'
import { generateMiddlewares } from '@app/middlewares'
import { useConnects } from '@app/composable/users/connects'
import { formatNumber } from '@utils/commons'
import { useSearchUsers } from '@app/composable/users'
import SearchConnectedUser from '@app/components/users/connects/SearchConnectedUser.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'UsersConnect',
	components: { SearchConnectedUser },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Stranerd Connect', { back: true })
		const { id } = useAuth()
		const { receivedConnects } = useConnects()
		const { detail, users: searchedUsers, reset, fetched, loading, search } = useSearchUsers()
		const users = computed(() => searchedUsers.value.filter((u) => u.id !== id.value))
		const isOpen = ref(false)
		const tab = ref(0)
		const openModal = (t = 0) => {
			isOpen.value = true
			tab.value = t
		}
		const closeModal = () => {
			isOpen.value = false
			reset()
		}
		return {
			peopleOutline, personOutline, alertCircleOutline, informationCircleOutline,
			closeOutline, linkOutline, receivedConnects, formatNumber,
			isOpen, tab, openModal, closeModal, bulb,
			detail, users, reset, fetched, loading, search
		}
	}
})
</script>

<style lang="scss" scoped>
.modal-class {
	--max-width: calc(100vw - 2rem);
}
</style>
