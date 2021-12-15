<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Notes</ion-text>
			</div>
			<router-link
				:to="`/study/sets/${set.id}/notes`"
				class="text-primary normalText flex items-center font-bold">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="filtered.length === 0">
			<EmptyState info="No notes saved." />
		</template>

		<template v-else>
			<div class="showcase">
				<NoteCard v-for="note in filtered" :key="note.hash" :note="note" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import NoteCard from '@app/components/study/notes/NoteListCard.vue'
import { NoteEntity, SetEntity } from '@modules/study'

export default defineComponent({
	name: 'SetNoteList',
	components: { NoteCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		notes: {
			type: Array as PropType<NoteEntity[]>,
			required: true
		}
	},
	setup (props) {
		const filtered = computed({
			get: () => props.notes.slice(0, 6),
			set: () => {
			}
		})
		return { filtered }
	}
})
</script>

<style>
	ion-badge {
		--background: #FFDC00 !important;
		--color: #132740 !important;
		--padding-top: 6px !important;
	}
</style>
