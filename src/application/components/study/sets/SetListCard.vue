<template>
	<router-link :to="`/study/sets/${set.id}`"
		class="flex flex-col justify-between card-padding">
		<div class="flex gap-4 items-center">
			<ion-text class="font-500 truncate w-full">{{ set.name }}</ion-text>
			<ion-icon :icon="arrowForwardOutline" class="text-heading2" />
		</div>
		<div class="w-full flex items-center justify-between gap-2 text-sub text-secondaryText">
			<Tag :tag="`${formatNumber(set.allSaved.length)} ${pluralize(set.allSaved.length, 'Item', 'Items')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="folderOutline" class="mr-1" />
						<ion-text class="font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center gap-3">
				<Avatar v-if="set.user.id !== id" :id="set.user.id" :name="set.user.bio.fullName" :size="24"
					:src="set.user.bio.photo" />
				<Share :link="set.shareLink" :title="set.name" cssClass="text-heading2" text="Share this folder" />
				<SpinLoading v-if="loading" class="text-heading2" />
				<IonIcon v-if="set.user.id === id" :icon="settingsOutline" class="text-heading2"
					@click.prevent="showMenu" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import {
	arrowForwardOutline,
	closeOutline,
	folderOutline,
	pencilOutline,
	settingsOutline,
	trashBinOutline
} from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { openSetEditModal, useDeleteSet } from '@app/composable/study/sets'
import { useRouter } from 'vue-router'
import { actionSheetController } from '@ionic/vue'

export default defineComponent({
	name: 'SetListCard',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { deleteSet, loading } = useDeleteSet(props.set.id)
		const router = useRouter()
		const showMenu = async () => {
			const actionSheet = await actionSheetController.create({
				buttons: [
					{
						text: 'Edit folder', icon: pencilOutline,
						handler: () => openSetEditModal(props.set, router)
					},
					{ text: 'Delete folder', role: 'destructive', icon: trashBinOutline, handler: deleteSet },
					{ text: 'Cancel', icon: closeOutline, role: 'cancel' }
				]
			})
			await actionSheet.present()
		}
		return {
			id, arrowForwardOutline, folderOutline, settingsOutline,
			pluralize, formatNumber, loading, showMenu
		}
	}
})
</script>
