<template>
	<div class="showcase-flex flex-1">
		<form v-if="notes.length" class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyUserNotes v-if="!loading && !error && notes.length === 0" />
		<NoteListCard v-for="note in (searchMode ? searchResults : notes)" :key="note.hash"
			:note="note" class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderNotes" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { useUserNoteList } from '@app/composable/users/users/notes'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserNotes',
	components: { NoteListCard },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			notes, error, loading, hasMore, fetchOlderNotes,
			searchMode, searchResults, searchValue, search
		} = useUserNoteList(props.user.id)
		return {
			notes, error, loading, hasMore, fetchOlderNotes,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
