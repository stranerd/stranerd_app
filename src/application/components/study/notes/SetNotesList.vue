<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Notes</ion-text>
			</div>
			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/explore/notes">
				<span>explore</span>
			</router-link>
		</div>

		<template v-if="notes.length === 0">
			<div class="py-3">
				<EmptyState info="No notes saved." />
			</div>
		</template>

		<template v-else>
			<div class="showcase">
				<NoteListCard v-for="(note, index) in notes" :key="note.hash" :index="index+1" :note="note" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { NoteEntity } from '@modules/study'

export default defineComponent({
	name: 'SetNotesList',
	props: {
		notes: {
			type: Array as PropType<NoteEntity[]>,
			required: true
		}
	},
	components: { NoteListCard }
})
</script>

<style>

</style>
