<template>
	<router-link :to="`/study/documents/${document.id}`"
		class="w-full bg-white rounded-xl flex flex-col justify-between box-border card-padding text-secondaryText">
		<ion-text class="font-500 truncate w-full">{{ document.title }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2 text-sub">
			<Tag tag="Document">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="documentOutline" class="text-base mr-1" />
						<ion-text class="text-sub">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-3">
				<Avatar :id="document.user.id" :name="document.user.bio.fullName" :size="24"
					:src="document.user.bio.photo" />
				<Share :link="document.shareLink" :text="document.content" :title="document.title" cssClass="text-xl" />
				<SaveToSet :entity="document" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { documentOutline, downloadOutline, ellipsisVerticalOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { DocumentEntity } from '@modules/study'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { openDocumentEditModal } from '@app/composable/study/documents'

export default defineComponent({
	name: 'DocumentListCard',
	props: {
		document: {
			type: DocumentEntity,
			required: true
		},
		edit: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: { SaveToSet },
	setup () {
		return {
			ellipsisVerticalOutline, documentOutline, downloadOutline, openDocumentEditModal
		}
	}
})
</script>
