<template>
	<div class="showcase-flex">
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<DocumentListCard v-for="document in filtered" :key="document.hash" :document="document" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import DocumentListCard from '@app/components/study/documents/DocumentListCard.vue'
import { DocumentEntity } from '@modules/study'

export default defineComponent({
	name: 'SearchDocumentsList',
	components: { DocumentListCard },
	props: {
		documents: {
			type: Array as PropType<DocumentEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.documents.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
