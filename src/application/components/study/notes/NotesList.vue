<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">


				<ion-text class="mr-3">
					Notes
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Suggested
				</ion-badge>
			</div>

			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/explore/notes">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="notes.length === 0">
			<div class="py-3">
				<EmptyState info="No Notes Available." />
			</div>
		</template>

		<template v-else>
			<div class="showcase">
				<NoteListCard v-for="(note, index) in notes" :key="note" :index="index+1" :note="note" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronForwardOutline } from 'ionicons/icons'
import { useNoteList } from '@app/composable/study/notes'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { IonBadge } from '@ionic/vue'

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
			get: () => allNotes.value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			notes,
			chevronForwardOutline
		}
	}
})
</script>

<style>

</style>
