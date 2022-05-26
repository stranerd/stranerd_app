<template>
	<BlockLoading v-if="loading" />
	<div v-else class="flex flex-col">
		<DocumentListCard v-for="document in documents" :key="document.hash"
			:document="document" class="border-bottom-line" />
		<EmptyState v-if="!loading && !error && documents.length === 0"
			info="This user hasn't created any documents yet" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import DocumentListCard from '@app/components/study/documents/DocumentListCard.vue'
import { useUserDocumentList } from '@app/composable/users/users/documents'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileDocuments',
	components: { DocumentListCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { documents, error, loading, hasMore, fetchOlderDocuments } = useUserDocumentList(props.user.id)
		return { documents, error, loading, hasMore, fetchOlderDocuments }
	}
})
</script>
