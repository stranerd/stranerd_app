<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 pt-12 px-5">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 flex flex-col px-3 text-body">
		<div v-for="flashCard in note" :key="flashCard.hash" class="w-full md:px-2 md:py-3 mb-4 md:mb-0">
			<NoteListCard :note="flashCard" :openMenu="(event) => openMenu(flashCard, event)" />
		</div>
		<EmptyState v-if="!loading && !error && note.length === 0"
			info="This user hasn't created any note yet or they are marked private" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { useNote } from '@app/composable/study/notes'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { NoteEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

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
		const { note, error, loading } = useNote(props.user.id)

		const openMenu = (entity: NoteEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		return { note, error, loading, openMenu }
	}
})
</script>
