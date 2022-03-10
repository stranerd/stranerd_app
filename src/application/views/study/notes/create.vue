<template>
	<!-- <Justified>
		<div class="p-4 lg:w-8/12 w-full mx-auto">
			<NoteForm :error="error" :factory="factory" :loading="loading" :submit="createNote"
				class="p-4 md:p-8 bg-white">
				<template v-slot:buttonText>
				</template>
			</NoteForm>
		</div>
	</Justified> -->
	<div/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateNote } from '@app/composable/study/notes'
import { useStudyModal } from '@app/composable/core/modals'
// import NoteForm from '@app/components/study/notes/NoteForm.vue'
// import Justified from '@app/layouts/Justified.vue'

export default defineComponent({
	name: 'StudyNotesCreate',
	displayName: 'Create Note',
	// components: { Justified, NoteForm },
	middlewares: ['isAuthenticated', async ({ from }) => {
		useStudyModal().openCreateNote()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}],
	setup () {
		const { loading, error, factory, createNote } = useCreateNote()
		return { loading, error, factory, createNote }
	}
})
</script>
