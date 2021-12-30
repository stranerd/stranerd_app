<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text class="mr-3">
					Notes
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Latest
				</ion-badge>
			</div>

			<router-link
				class="text-primary text-body flex items-center font-bold"
				to="/search/notes">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="notes.length === 0">
			<EmptyState info="No notes available." />
		</template>

		<template v-else>
			<div class="showcase">
				<NoteListCard v-for="note in notes" :key="note.hash" :note="note"
					:openMenu="(event) => openMenu(note, event)" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useNoteList } from '@app/composable/study/notes'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { IonBadge } from '@ionic/vue'
import { NoteEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'NotesList',
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	components: { NoteListCard, IonBadge },
	setup () {
		const { notes: allNotes, listener, loading, error } = useNoteList()
		const notes = computed({
			get: () => allNotes.value.slice(0, 3),
			set: () => {
			}
		})

		const openMenu = (entity: NoteEntity, event: Event) => openStudyEntityMenu(entity, {}, event)

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { notes, openMenu }
	}
})
</script>
