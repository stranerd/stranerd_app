<template>
	<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl " />
	<div v-else>
		<template v-if="filtered.length === 0">
			<EmptyState info="No notes available." />
		</template>
		<template v-else>
			<div class="showcase">
				<NoteListCard v-for="note in filtered" :key="note.hash" :note="note"
					:openMenu="(event:any) => openMenu(note, event)" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { NoteEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { IonSkeletonText } from '@ionic/vue'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchNotesList',
	components: { NoteListCard, IonSkeletonText },
	props: {
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
		const { loading } = useSearch()
		const openMenu = (entity: NoteEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => props.notes.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading }
	}
})
</script>
