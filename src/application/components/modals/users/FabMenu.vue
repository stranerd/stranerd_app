<template>
	<div class="modal-content">
		<div class="px-4 py-6 md:p-8 flex flex-col">
			<router-link v-for="{ path, icon, name } in [
				{ name: 'Ask a question', path: '/questions/create', icon: helpCircleOutline },
				{ name: 'Create a class', path: '/classes/create', icon: peopleOutline },
				{ name: 'Create flashcard set', path: '/study/flashCards/create', icon: flashOutline },
				...(adminClasses.length ? [
					{ name: 'Make an announcement', path: '/classes/announcements/create', icon: megaphoneOutline },
					{ name: 'Start a discussion', path: '/classes/groups/create', icon: chatbubblesOutline },
				] : []),
				{ name: 'Upload a file', path: '/study/files/create', icon: documentOutline },
				{ name: 'Write a note', path: '/study/notes/create', icon: createOutline },
			]" :key="path" :to="path" class="flex items-center gap-4 py-4">
				<IonIcon :icon="icon" />
				<span>{{ name }}</span>
			</router-link>
			<IonButton class="btn-primary mt-2" @click="close">Cancel</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserModal } from '@app/composable/core/modals'
import {
	chatbubblesOutline,
	createOutline,
	documentOutline,
	flashOutline,
	helpCircleOutline,
	megaphoneOutline,
	peopleOutline
} from 'ionicons/icons'
import { useUserClassList } from '@app/composable/users/users/classes'

export default defineComponent({
	name: 'FabMenu',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { adminClasses } = useUserClassList()
		return {
			adminClasses, helpCircleOutline, flashOutline, documentOutline,
			createOutline, peopleOutline, megaphoneOutline, chatbubblesOutline
		}
	}
})
</script>
