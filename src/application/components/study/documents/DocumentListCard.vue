<template>
	<router-link :to="`/study/documents/${document.id}`"
		class="flex flex-col justify-between card-padding">
		<div class="flex gap-4 items-center">
			<IonText class="font-500 truncate w-full">{{ document.title }}</IonText>
			<IonIcon :icon="arrowForwardOutline" />
		</div>
		<div class="w-full flex items-center justify-between gap-2 text-sm">
			<Tag tag="Document">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<IonIcon :icon="documentOutline" class="text-base mr-1" />
						<IonText class="text-sm">{{ slotProps.tag }}</IonText>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-3">
				<Avatar v-if="document.user.id !== id" :id="document.user.id" :name="document.user.bio.fullName"
					:size="24"
					:src="document.user.bio.photo" />
				<Share :link="document.shareLink" :text="document.content" :title="document.title" />
				<SaveToSet :entity="document" />
				<SpinLoading v-if="loading" />
				<IonIcon v-if="document.user.id === id" :icon="settingsOutline" @click.prevent="showMenu" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import {
	arrowForwardOutline,
	closeOutline,
	documentOutline,
	pencilOutline,
	settingsOutline,
	trashBinOutline
} from 'ionicons/icons'
import { defineComponent } from 'vue'
import { DocumentEntity } from '@modules/study'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useAuth } from '@app/composable/auth/auth'
import { openDocumentEditModal, useDeleteDocument } from '@app/composable/study/documents'
import { useRouter } from 'vue-router'
import { actionSheetController } from '@ionic/vue'

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
	setup (props) {
		const { id } = useAuth()
		const { deleteDocument, loading } = useDeleteDocument(props.document.id)
		const router = useRouter()
		const showMenu = async () => {
			const actionSheet = await actionSheetController.create({
				buttons: [
					{
						text: 'Edit document', icon: pencilOutline,
						handler: () => openDocumentEditModal(props.document, router)
					},
					{ text: 'Delete document', role: 'destructive', icon: trashBinOutline, handler: deleteDocument },
					{ text: 'Cancel', icon: closeOutline, role: 'cancel' }
				]
			})
			await actionSheet.present()
		}
		return {
			id, settingsOutline, arrowForwardOutline, documentOutline,
			loading, showMenu
		}
	}
})
</script>
