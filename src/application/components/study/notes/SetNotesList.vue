<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState btnText="Explore Notes"
				info="You have not saved any notes yet. <br>
Find the ones you need to study for your exams, tests or homeworks and save them now."
				route="/explore/notes"
			/>
		</template>
		<div class="showcase">
			<NoteListCard v-for="note in filtered" :key="note.hash" :note="note" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { NoteEntity, SetEntity } from '@modules/study'

export default defineComponent({
	name: 'SetNotesList',
	components: { NoteListCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		notes: {
			type: Array as PropType<NoteEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.notes.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
