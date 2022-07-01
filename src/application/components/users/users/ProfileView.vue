<template>
	<div v-if="user">
		<UserPageCard :user="user" class="border-bottom-line px-4 lg:px-8 pb-6" />

		<div v-if="0" class="border-bottom-line gap-4 py-6 px-4 lg:px-8 flex items-center">
			<IonIcon :icon="helpCircleOutline" />
			<IonText>You have 5 questions to ask</IonText>
			<IonIcon :icon="cartOutline" class="ml-auto" />
		</div>

		<div class="flex flex-col gap-6 py-8 px-4 lg:px-8 text-secondaryText">
			<router-link v-for="{ label, route, icon } in [
				{ label: 'Stats', route: '/account/stats', icon: gridOutline },
				{ label: 'Questions', route: '/account/questions', icon: helpCircleOutline },
				{ label: 'Answers', route: '/account/answers', icon: readerOutline },
				{ label: 'Flashcards', route: '/account/flashCards', icon: flashOutline },
				{ label: 'Notes', route: '/account/notes', icon: documentTextOutline },
				{ label: 'My Library', route: '/account/files', icon: libraryOutline },
				{ label: 'Saved', route: '/account/sets', icon: bookmarkOutline },
				{ label: 'Settings', route: '/settings', icon: settingsOutline },
			]" :key="route" :to="route" class="flex gap-3 items-center">
				<IonIcon :icon="icon" />
				<span>{{ label }}</span>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import {
	bookmarkOutline,
	cartOutline,
	documentTextOutline,
	flashOutline,
	gridOutline,
	helpCircleOutline,
	libraryOutline,
	readerOutline,
	settingsOutline
} from 'ionicons/icons'
import UserPageCard from '@app/components/users/users/UserPageCard.vue'

export default defineComponent({
	name: 'ProfileView',
	components: { UserPageCard },
	setup () {
		const { id, user } = useAuth()
		return {
			id, user,
			gridOutline, helpCircleOutline, readerOutline, flashOutline, libraryOutline,
			documentTextOutline, bookmarkOutline, settingsOutline, cartOutline
		}
	}
})
</script>
