<template>
	<DefaultLayout>
		<div v-if="note">
			<div class="py-4">
				<div
					class="flex flex-col md:flex-row md:justify-between justify-start items-start px-4 w-full lg:w-8/12 w-full mx-auto">
					<IonText class="text-xl font-bold text-secondaryText text-start">
						{{ note.title }}
					</IonText>
					<div class="items-center font-normal flex gap-3">
						<Avatar :id="note.user.id" :name="note.user.bio.fullName" :size="24"
							:src="note.user.bio.photo" />
						<Share :link="note.shareLink" :title="note.title" text="Share this note" />
						<SaveToSet :entity="note" />
					</div>
				</div>
			</div>
			<div class="w-full lg:w-8/12 w-full mx-auto">
				<NoteDetails :note="note" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</DefaultLayout>
</template>

<script lang="ts">
import Avatar from '@app/components/core/Avatar.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useNote } from '@app/composable/study/notes'
import Share from '@app/components/core/Share.vue'
import NoteDetails from '@app/components/study/notes/NoteDetails.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyNotesNoteId',
	components: { Avatar, NoteDetails, Share, SaveToSet },
	setup () {
		useRouteMeta('Note', { back: true })
		const { noteId } = useRoute().params
		const { error, loading, note } = useNote(noteId as string)
		return { loading, note, error }
	}
})
</script>
