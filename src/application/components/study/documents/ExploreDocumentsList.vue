<template>
	<div>
		<BlockLoading v-if="loading" />
		<EmptyState v-if="!loading && !error && filtered.length === 0" info="No documents found." />
		<div class="showcase">
			<DocumentListCard v-for="document in filtered" :key="document.hash" :document="document" />
		</div>
		<div v-if="hasMore && !sliced"
			class="text-center py-8 text-lg w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderDocuments">Load More</a>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import DocumentListCard from '@app/components/study/documents/DocumentListCard.vue'
import { useDocumentList } from '@app/composable/study/documents'

export default defineComponent({
	name: 'ExploreDocumentsList',
	components: { DocumentListCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, error, documents, hasMore, fetchOlderDocuments } = useDocumentList()
		const filtered = computed(() => documents.value.slice(0, props.sliced ? 3 : undefined))
		return { filtered, loading, error, hasMore, fetchOlderDocuments }
	}
})
</script>
