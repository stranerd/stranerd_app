<template>
	<div class="flex flex-col">
		<form class="p-4" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<DocumentListCard v-for="document in (searchMode ? searchResults : documents)" :key="document.hash"
			:document="document" class="border-bottom-line" />
		<EmptyState v-if="!loading && !error && documents.length === 0" class="border-bottom-line"
			info="This user hasn't created any documents yet" />
		<LoadMore v-if="hasMore" :load="fetchOlderDocuments" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentListCard from '@app/components/study/documents/DocumentListCard.vue'
import { useUserDocumentList } from '@app/composable/users/users/documents'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileDocuments',
	components: { DocumentListCard, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			documents, error, loading, hasMore, fetchOlderDocuments,
			searchMode, searchResults, searchValue, search
		} = useUserDocumentList(props.user.id)
		return {
			documents, error, loading, hasMore, fetchOlderDocuments,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
