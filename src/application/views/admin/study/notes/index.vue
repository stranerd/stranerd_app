<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-8">
				<router-link class="bg-primary rounded-lg px-8 py-4 text-white font-bold"
					to="/admin/study/notes/create">
					Add New Note
				</router-link>
			</div>

			<AdminNotesList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminNotesList from '@app/components/study/notes/AdminNotesList.vue'

export default defineComponent({
	name: 'AdminStudyNotesIndex',
	displayName: 'Administration',
	components: { AdminWrapper, AdminNotesList },
	middlewares: ['isAdmin']
})
</script>
