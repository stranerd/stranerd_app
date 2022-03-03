<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 py-8">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 gap-4 flex flex-col text-body">
		<NoteListCard v-for="note in notes" :key="note.hash" :note="note" />
		<EmptyState v-if="!loading && !error && notes.length === 0"
			info="This user hasn't created any notes yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { useUserNoteList } from '@app/composable/users/users/notes'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileNotes',
	components: { NoteListCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { notes, error, loading } = useUserNoteList(props.user.id)
		return { notes, error, loading }
	}
})
</script>
