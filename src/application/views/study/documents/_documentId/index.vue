<template>
	<Justified>
		<div v-if="document">
			<div class="blueTop py-4">
				<div
					class="flex flex-col md:flex-row md:justify-between justify-start items-start px-4 w-full lg:w-8/12 w-full mx-auto">
					<IonText class="text-heading font-bold text-secondaryText text-start">
						{{ document.title }}
					</IonText>
					<div class="items-center text-gray font-normal flex gap-3">
						<Avatar :id="document.user.id" :name="document.user.bio.fullName" :size="24"
							:src="document.user.bio.photo" />
						<Share :link="document.shareLink" :title="document.title" cssClass="text-heading2"
							text="Share this document" />
						<SaveToSet :entity="document" />
					</div>
				</div>
			</div>
			<div class="w-full lg:w-8/12 w-full mx-auto">
				<DocumentDetails :document="document" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import {
	add,
	checkmarkCircleOutline,
	chevronDown,
	chevronUp,
	contract,
	pencil,
	remove,
	scan,
	shareSocial
} from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useDocument } from '@app/composable/study/documents'
import Share from '@app/components/core/Share.vue'
import DocumentDetails from '@app/components/study/documents/DocumentDetails.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyDocumentsDocumentId',
	components: { Justified, Avatar, DocumentDetails, Share, SaveToSet },
	setup () {
		useRouteMeta('Document')
		const { documentId } = useRoute().params
		const { error, loading, document } = useDocument(documentId as string)
		return {
			add, remove, scan, chevronDown, loading, document, error,
			chevronUp, pencil, contract, shareSocial, checkmarkCircleOutline
		}
	}
})
</script>
