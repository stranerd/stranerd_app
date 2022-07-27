<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && notes.length === 0">
			<div class="flex flex-col items-center gap-4">
				<img src="@/assets/images/emptyStates/note.svg" alt="question empty state">
				<p class="text-lg font-bold">No notes</p>
				<span class="text-center ">Your notes will show up here.</span>
				<IonButton class="btn-outline" style="--border-radius:20px">Write a note</IonButton>
			</div>
		</EmptyState>
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
