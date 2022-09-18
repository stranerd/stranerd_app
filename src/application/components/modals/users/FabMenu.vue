<template>
	<div class="modal-content">
		<div class="px-4 pt-8 pb-10 md:p-8 flex flex-col">
			<router-link v-for="{ path, icon, name } in [
				{ name: 'Ask a question', path: '/questions/create', icon: helpCircleOutline },
				{ name: 'Create a flashcard set', path: '/study/flashCards/create', icon: copyOutline },

				/* ...(user && user.isCollege(user) ? [
					{ name: 'Create a class', path: '/classes/create', icon: peopleOutline },
				] : []),
				...(adminClasses.length ? [
					{ name: 'Make an announcement', path: '/classes/announcements/create', icon: megaphoneOutline },
					{ name: 'Start a discussion', path: '/classes/groups/create', icon: chatbubblesOutline },
				] : []),
				{ name: 'Upload a file', path: '/study/files/create', icon: documentOutline },
				{ name: 'Write a note', path: '/study/notes/create', icon: createOutline }, */
			]" :key="path" :to="path" class="flex items-center gap-4 py-4 text-secondaryText">
				<IonIcon :icon="icon" />
				<span>{{ name }}</span>
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	arrowForwardOutline,
	chatbubblesOutline,
	copyOutline,
	createOutline,
	documentOutline,
	helpCircleOutline,
	megaphoneOutline,
	peopleOutline
} from 'ionicons/icons'
import { useUserClassList } from '@app/composable/users/users/classes'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'FabMenu',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { user } = useAuth()
		const { adminClasses } = useUserClassList()
		return {
			user, adminClasses, arrowForwardOutline, helpCircleOutline, copyOutline, documentOutline,
			createOutline, peopleOutline, megaphoneOutline, chatbubblesOutline
		}
	}
})
</script>
