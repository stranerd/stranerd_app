<template>
	<div v-if="user">
		<UserPageCard :user="user" class="border-bottom-line" />

		<div v-if="0" class="border-bottom-line gap-4 px-4 py-6 flex items-center">
			<IonIcon :icon="helpCircleOutline" />
			<IonText>You have 5 questions to ask</IonText>
			<IonIcon :icon="cartOutline" class="ml-auto" />
		</div>

		<div class="flex flex-col gap-6 px-4 py-8 text-secondaryText">
			<router-link v-for="{ label, route, icon } in [
				{ label: 'Stats', route: '/account/stats', icon: gridOutline },
				{ label: 'Questions', route: '/account/questions', icon: helpCircleOutline },
				{ label: 'Answers', route: '/account/answers', icon: readerOutline },
				{ label: 'Flashcards', route: '/account/flashCards', icon: flashOutline },
				{ label: 'Documents', route: '/account/documents', icon: documentTextOutline },
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
			gridOutline, helpCircleOutline, readerOutline, flashOutline,
			documentTextOutline, bookmarkOutline, settingsOutline, cartOutline
		}
	}
})
</script>
